import { getToken } from '@/lib/get-token';
import { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3005'; // Replace with your NestJS backend URL

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]); // Store messages by chatId
    const [connectionStatus, setConnectionStatus] = useState<
        'connected' | 'disconnected' | 'error'
    >('disconnected');

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

            // Listen for incoming messages
            socketInstance.on('message', (messageData) => {
                console.log('Received message:', messageData);
                setMessages((prevMessages) => [...prevMessages, messageData]);
            });

            setSocket(socketInstance);

            return () => {
                socketInstance.disconnect();
            };
        };
        socketConnection();
    }, []);

    const memoizedValue = useMemo(
        () => ({
            socket,
            messages,
            connectionStatus,
            setMessages,
        }),
        [socket, messages, connectionStatus, setMessages]
    );
    return memoizedValue;
};
