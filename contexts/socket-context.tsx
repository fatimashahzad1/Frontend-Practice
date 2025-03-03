import {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { getToken } from '@/lib/get-token';
import AgoraRTC, {
    IAgoraRTCClient,
    IAgoraRTCRemoteUser,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';

const SOCKET_URL = 'http://localhost:3005'; // Replace with your NestJS backend URL

interface Message {
    id: string;
    text: string;
    sender: string;
}

interface SocketContextType {
    socket: Socket | null;
    messages: Message[];
    connectionStatus: 'connected' | 'disconnected' | 'error';
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    incomingCall: IncomingCall | null;
    acceptCall: () => void;
    rejectCall: () => void;
    leaveCall: () => void;
    localUser: {
        videoTrack: ICameraVideoTrack | null;
        audioTrack: IMicrophoneAudioTrack | null;
    };
    setLocalUser: Dispatch<
        SetStateAction<{
            videoTrack: ICameraVideoTrack | null;
            audioTrack: IMicrophoneAudioTrack | null;
        }>
    >;

    remoteUser: IAgoraRTCRemoteUser | null;
    setRemoteUser: Dispatch<SetStateAction<IAgoraRTCRemoteUser | null>>;
    agoraClient: IAgoraRTCClient | null;
    setAgoraClient: Dispatch<SetStateAction<IAgoraRTCClient | null>>;
    remoteUsername: string;
    localUserName: string;
    channelName: string | null;
    setChannelName: Dispatch<SetStateAction<string | null>>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<
        'connected' | 'disconnected' | 'error'
    >('disconnected');
    const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);

    const [agoraClient, setAgoraClient] = useState<IAgoraRTCClient | null>(
        null
    );
    const [remoteUser, setRemoteUser] = useState<null | IAgoraRTCRemoteUser>(
        null
    );
    const [localUser, setLocalUser] = useState<{
        videoTrack: ICameraVideoTrack | null;
        audioTrack: IMicrophoneAudioTrack | null;
    }>({ videoTrack: null, audioTrack: null });
    const [localUserName, setLocalUserName] = useState('');
    const [remoteUsername, setRemoteUsername] = useState('');
    const [channelName, setChannelName] = useState<string | null>(null);

    useEffect(() => {
        const socketConnection = async () => {
            const token = await getToken();
            const socketInstance = io(SOCKET_URL, {
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });

            socketInstance.on('connect', () => {
                console.log('Connected to server:', socketInstance.id);
                setConnectionStatus('connected');
            });

            socketInstance.on('disconnect', () => {
                console.log('Disconnected from server');
                setConnectionStatus('disconnected');
            });

            socketInstance.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
                setConnectionStatus('error');
            });

            // Listen for messages
            socketInstance.on('message', (messageData: Message) => {
                console.log('Received message:', messageData);
                setMessages((prevMessages) => [...prevMessages, messageData]);
            });

            // Call token event for publisher
            socketInstance?.on(
                'getCallToken',
                ({ token, channelName, callerId, callerName }) => {
                    console.log(
                        'Call token:',
                        token,
                        channelName,
                        callerId,
                        callerName
                    );
                    joinCall(token, channelName, callerId);
                    setChannelName(channelName);
                    setLocalUserName(callerName);
                }
            );

            // Incoming call event
            socketInstance?.on('incomingCall', (messageData) => {
                console.log('Received call:', messageData);
                setIncomingCall(messageData);
            });

            socketInstance?.on(
                'getReceiverToken',
                ({
                    callerId,
                    callerName,
                    receiverId,
                    receiverName,
                    channelName,
                    token,
                }) => {
                    console.log('getReceiverToken:', {
                        callerId,
                        callerName,
                        receiverId,
                        receiverName,
                        token,
                        channelName,
                    });

                    joinCall(token, channelName, receiverId);
                    setChannelName(channelName);
                    setLocalUserName(receiverName);
                }
            );

            setSocket(socketInstance);

            return () => {
                socketInstance.disconnect();
            };
        };

        socketConnection();
    }, []);

    const joinCall = useCallback(
        async (token: string, channelName: string, uid: number) => {
            const client = AgoraRTC.createClient({
                mode: 'rtc',
                codec: 'vp8',
            });
            await client?.join(
                process.env.NEXT_PUBLIC_AGORA_APP_ID as string,
                channelName,
                token,
                uid
            );

            console.log('channelName=================', channelName);
            setAgoraClient(client);

            const localTracks =
                await AgoraRTC.createMicrophoneAndCameraTracks();
            setLocalUser({
                videoTrack: localTracks[1],
                audioTrack: localTracks[0],
            });

            await client?.publish(localTracks);
        },
        []
    );

    const acceptCall = useCallback(() => {
        console.log('IN acceptCalllllllll 111111');
        if (socket && incomingCall) {
            console.log('IN acceptCalllllllll222222');
            socket.emit('acceptCall', {
                callerId: incomingCall.callerId,
                callerName: incomingCall.callerName,
                receiverId: incomingCall.receiverId,
                receiverName: incomingCall.receiverName,
            });
            setIncomingCall(null);
        }
    }, [socket, incomingCall]);

    const rejectCall = useCallback(() => {
        if (socket && incomingCall) {
            socket.emit('rejectCall', { callerId: incomingCall.callerId });
            setIncomingCall(null);
        }
    }, [socket, incomingCall]);

    const leaveCall = useCallback(async () => {
        console.log('client=================', agoraClient);

        await agoraClient?.unpublish();
        // Close and stop audio/video tracks
        localUser.audioTrack?.stop();
        localUser.audioTrack?.close();
        localUser.videoTrack?.stop();
        localUser.videoTrack?.close();
        // Leave the channel
        await agoraClient?.leave();
        setLocalUser({ videoTrack: null, audioTrack: null });
        setRemoteUser(null);
        setAgoraClient(null);
        setChannelName(null);

        console.log('user has left the call!');
    }, [agoraClient, localUser]);
    const value = useMemo(
        () => ({
            socket,
            messages,
            connectionStatus,
            setMessages,
            incomingCall,
            acceptCall,
            rejectCall,
            localUser,
            remoteUser,
            setRemoteUser,
            leaveCall,
            agoraClient,
            localUserName,
            remoteUsername,
            setLocalUser,
            setAgoraClient,
            channelName,
            setChannelName,
        }),
        [
            socket,
            messages,
            connectionStatus,
            setMessages,
            incomingCall,
            acceptCall,
            rejectCall,
            localUser,
            remoteUser,
            setRemoteUser,
            leaveCall,
            agoraClient,
            localUserName,
            remoteUsername,
            setLocalUser,
            setAgoraClient,
            channelName,
            setChannelName,
        ]
    );

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom Hook to use Socket Context
export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error(
            'useSocketContext must be used within a SocketProvider'
        );
    }
    return context;
};
