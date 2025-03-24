import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "@/lib/get-token";
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";

const SOCKET_URL = "http://localhost:3005"; // Replace with your NestJS backend URL

interface SocketContextType {
  socket: Socket | null;
  messages: Message[];
  connectionStatus: "connected" | "disconnected" | "error";
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  incomingCall: IncomingCall | null;
  acceptCall: () => void;
  rejectCall: () => void;
  leaveCall: () => void;
  remoteUser: IAgoraRTCRemoteUser | null;
  setRemoteUser: Dispatch<SetStateAction<IAgoraRTCRemoteUser | null>>;
  agoraClient: IAgoraRTCClient | null;
  setAgoraClient: Dispatch<SetStateAction<IAgoraRTCClient | null>>;
  remoteUsername: string;
  setRemoteUsername: Dispatch<SetStateAction<string>>;
  localUserName: string;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "error"
  >("disconnected");
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);

  const [agoraClient, setAgoraClient] = useState<IAgoraRTCClient | null>(null);
  const [remoteUser, setRemoteUser] = useState<null | IAgoraRTCRemoteUser>(
    null,
  );
  const [localUserName, setLocalUserName] = useState("");
  const [remoteUsername, setRemoteUsername] = useState("");

  useEffect(() => {
    const socketConnection = async () => {
      const token = await getToken();
      const socketInstance = io(SOCKET_URL, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      socketInstance.on("connect", () => {
        console.log("Connected to server:", socketInstance.id);
        setConnectionStatus("connected");
      });

      socketInstance.on("disconnect", () => {
        console.log("Disconnected from server");
        setConnectionStatus("disconnected");
      });

      socketInstance.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setConnectionStatus("error");
      });

      // Listen for messages
      socketInstance.on("message", (messageData: Message) => {
        console.log("Received message:", messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
      });

      // Call token event for publisher
      socketInstance?.on(
        "getCallToken",
        ({ token, channelName, callerId, callerName }) => {
          joinCall(token, channelName, callerId);
          setLocalUserName(callerName);
        },
      );

      // Incoming call event
      socketInstance?.on("incomingCall", (messageData) => {
        setIncomingCall(messageData);
        setRemoteUsername(messageData.callerName);
      });

      socketInstance?.on(
        "getReceiverToken",
        ({
          callerId,
          callerName,
          receiverId,
          receiverName,
          channelName,
          token,
        }) => {
          joinCall(token, channelName, receiverId);
          setLocalUserName(receiverName);
        },
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
        mode: "rtc",
        codec: "vp8",
      });
      await client?.join(
        process.env.NEXT_PUBLIC_AGORA_APP_ID as string,
        channelName,
        token,
        uid,
      );
      setAgoraClient(client);

      const localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

      await client?.publish(localTracks);
    },
    [],
  );

  const acceptCall = useCallback(() => {
    if (socket && incomingCall) {
      socket.emit("acceptCall", {
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
      socket.emit("rejectCall", { callerId: incomingCall.callerId });
      setIncomingCall(null);
    }
  }, [socket, incomingCall]);

  const leaveCall = useCallback(async () => {
    await agoraClient?.unpublish();
    await agoraClient?.leave();
    setRemoteUser(null);
    setAgoraClient(null);
  }, [agoraClient]);
  const value = useMemo(
    () => ({
      socket,
      messages,
      connectionStatus,
      setMessages,
      incomingCall,
      acceptCall,
      rejectCall,
      remoteUser,
      setRemoteUser,
      leaveCall,
      agoraClient,
      localUserName,
      remoteUsername,
      setAgoraClient,
      setRemoteUsername,
    }),
    [
      socket,
      messages,
      connectionStatus,
      setMessages,
      incomingCall,
      acceptCall,
      rejectCall,
      remoteUser,
      setRemoteUser,
      leaveCall,
      agoraClient,
      localUserName,
      remoteUsername,
      setAgoraClient,
      setRemoteUsername,
    ],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

// Custom Hook to use Socket Context
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
