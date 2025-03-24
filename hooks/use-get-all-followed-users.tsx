"use client";
import { getToken } from "@/lib/get-token";
import { getClient } from "@/utils/client";
import { useQuery } from "@tanstack/react-query";

const useGetAllFollowedUsers = () => {
  return useQuery<Followers>({
    queryKey: ["followed-users"], // Include pagination params in query key
    queryFn: () => getFollowedUsers(),
    staleTime: 24 * 60 * 60 * 1000,
    throwOnError: true,
  });
};

// Extract query function to avoid unnecessary re-renders
const getFollowedUsers = async () => {
  const token = await getToken();
  const result = await getClient("people/follow", token);
  return result;
};

export default useGetAllFollowedUsers;
