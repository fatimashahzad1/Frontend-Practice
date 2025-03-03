import { Button } from '@/components/ui/button';
import { useSocketContext } from '@/contexts/socket-context';
import { PhoneCall } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const SingleVideoCall: React.FC = () => {
    const {
        localUser,
        remoteUser,
        setRemoteUser,
        leaveCall,
        agoraClient,
        localUserName,
        remoteUsername,
        channelName,
        socket,
    } = useSocketContext();
    const localVideoRef = useRef<HTMLDivElement>(null);
    const remoteVideoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (localUser.videoTrack && localVideoRef.current) {
            localUser.videoTrack.play(localVideoRef.current);
        }
    }, [localUser.videoTrack]);

    useEffect(() => {
        if (remoteUser?.videoTrack && remoteVideoRef.current) {
            remoteUser.videoTrack.play(remoteVideoRef.current);
        }
    }, [remoteUser]);

    useEffect(() => {
        agoraClient?.on(
            'connection-state-change',
            (curState, revState, reason) => {
                console.log('connection-state-change==', {
                    curState,
                    revState,
                    reason,
                });
            }
        );

        agoraClient?.on('user-joined', (user) => {
            console.log('user joined=====', user);
        });

        agoraClient?.on('user-published', async (user, mediaType) => {
            console.log('&&&&&&&&&&&&&&&&&', user);
            await agoraClient.subscribe(user, mediaType);
            if (mediaType === 'video') {
                setRemoteUser(user);
            }
        });

        agoraClient?.on('user-left', (user, reason) => {
            console.log('user-left======', { user, reason });
            socket?.emit('leaveCall', {
                channelName,
            });

            // Clear refs
            if (localVideoRef.current) {
                localVideoRef.current.innerHTML = ''; // Remove video from div
            }
            if (remoteVideoRef.current) {
                remoteVideoRef.current.innerHTML = ''; // Remove video from div
            }
            leaveCall();
        });
    }, [agoraClient, setRemoteUser, socket, channelName, leaveCall]);
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-64 h-48 bg-gray-900 text-white flex items-center justify-center">
                <div ref={localVideoRef} className="w-full h-full" />
                {!localUser.videoTrack && <p>Waiting for local video...</p>}
            </div>
            <p className="">{localUserName} </p>

            <div className="w-64 h-48 bg-gray-900 text-white flex items-center justify-center">
                <div ref={remoteVideoRef} className="w-full h-full" />
                {!remoteUser?.videoTrack && <p>Waiting for remote video...</p>}
            </div>
            <p className="">{remoteUsername} </p>
            <Button
                variant="outline"
                size="icon"
                className="bg-red-700 p-2 text-white rounded-full"
                onClick={leaveCall}
            >
                <PhoneCall height={40} width={40} />
            </Button>
        </div>
    );
};

export default SingleVideoCall;
