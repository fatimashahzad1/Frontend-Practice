"use client";
import { ROUTE_QUERY_KEYS } from "@/constants/routes";
import { getToken } from "@/lib/get-token";
import { getClient } from "@/utils/client";
import { useQuery } from "@tanstack/react-query";

const useUser = (userId?: number) => {
  return useQuery<User>({
    queryKey: [ROUTE_QUERY_KEYS.USER_DETAILS, userId],
    queryFn: () => getFollowedUsers(userId),
    staleTime: 24 * 60 * 60 * 1000,
    throwOnError: true,
  });
};

// Extract query function to avoid unnecessary re-renders
const getFollowedUsers = async (userId?: number) => {
  try {
    const token = await getToken();
    const result = await getClient(`users/detail${userId ?? ""}`, token);
    return result;
  } catch (error) {
    console.log("Here in hook");
    throw error;
  }
};

export default useUser;
