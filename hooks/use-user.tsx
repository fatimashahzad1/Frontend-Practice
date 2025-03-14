'use client';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';
import { getToken } from '@/lib/get-token';
import { getClient } from '@/utils/client';
import { useQuery } from '@tanstack/react-query';

const useUser = (userId?: number) => {
  return useQuery<User>({
    queryKey: [ROUTE_QUERY_KEYS.USER_DETAILS, userId],
    queryFn: () => getFollowedUsers(userId),
    staleTime: 24 * 60 * 60 * 1000,
    retry: 2,
  });
};

// Extract query function to avoid unnecessary re-renders
const getFollowedUsers = async (userId?: number) => {
  const token = await getToken();
  const result = await getClient(`users/detail${userId ?? ''}`, token);

  if (result?.error) {
    throw new Error(result?.message || 'Failed to fetch user detail');
  }

  return result;
};

export default useUser;
