'use client';
import { getToken } from '@/lib/get-token';
import { getClient } from '@/utils/client';
import { useQuery } from '@tanstack/react-query';

const useGetAllCalls = () => {
    return useQuery<Call[]>({
        queryKey: ['calls'], // Include pagination params in query key
        queryFn: () => getAllCalls(),
        staleTime: 24 * 60 * 60 * 1000,
    });
};

// Extract query function to avoid unnecessary re-renders
const getAllCalls = async () => {
    const token = await getToken();
    const result = await getClient('call', token);

    if (result?.error) {
        throw new Error(result?.message || 'Failed to fetch articles');
    }

    return result;
};

export default useGetAllCalls;
