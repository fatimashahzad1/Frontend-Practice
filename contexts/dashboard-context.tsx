import { createContext, useContext, useMemo } from 'react';
import { getToken } from '@/lib/get-token';

import { getClient } from '@/utils/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';

interface DashboardContextType {
    posts: Post[] | undefined;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
);

// Fetch all posts
const fetchAllPosts = async (toast: any) => {
    const token = await getToken();
    if (!token) throw new Error('Token is Missing');

    const result = await getClient('post/all', token);
    if (result?.statusCode >= 400) {
        toast({
            title: 'Error',
            description: 'Failed to fetch chats',
            variant: 'destructive',
        });
    }

    return result;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { toast } = useToast();

    const {
        data: posts,
        isError: chatsError,
        isLoading: chatsIsLoading,
    } = useQuery<Post[]>({
        queryKey: [ROUTE_QUERY_KEYS.GET_ALL_POSTS],
        queryFn: () => fetchAllPosts(toast),
        staleTime: 24 * 60 * 60 * 1000,
    });
    const value = useMemo(() => ({ posts }), [posts]);
    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};

// Custom Hook to use Socket Context
export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error(
            'useSocketContext must be used within a SocketProvider'
        );
    }
    return context;
};
