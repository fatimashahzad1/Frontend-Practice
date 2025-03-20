'use client';
import { ROUTE_QUERY_KEYS } from "@/constants/routes";
import { getToken } from '@/lib/get-token';
import { getClient } from '@/utils/client';
import { useQuery } from '@tanstack/react-query';

const useGetAllUnFollowedUsers = () => {
    return useQuery<UnFollowedUser[]>({
        queryKey: [ROUTE_QUERY_KEYS.GET_ALL_UNFOLLOWED_USERS], // Include pagination params in query key
        queryFn: () => getUnFollowedUsers(),

        retry: 2,
    });
};

// Extract query function to avoid unnecessary re-renders
const getUnFollowedUsers = async () => {
    const token = await getToken();
    const result = await getClient('people/unfollow', token);

    if (result?.error) {
        throw new Error(result?.message || 'Failed to fetch articles');
    }

    return result;
};

export default useGetAllUnFollowedUsers;
