'use client';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';
import { getToken } from '@/lib/get-token';
import { getClient } from '@/utils/client';
import { useQuery } from '@tanstack/react-query';
// Extract query function to avoid unnecessary re-renders
const getAllCompanies = async () => {
  const token = await getToken();
  const result = await getClient('users/companies', token);
  return result;
};
const useGetAllCompanies = () => {
  return useQuery<Company[]>({
    queryKey: [ROUTE_QUERY_KEYS.GET_ALL_COMPANIES], // Include pagination params in query key
    queryFn: () => getAllCompanies(),
    staleTime: 24 * 60 * 60 * 1000,
    throwOnError: true,
  });
};

export default useGetAllCompanies;
