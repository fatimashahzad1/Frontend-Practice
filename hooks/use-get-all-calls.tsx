'use client';
import { getToken } from '@/lib/get-token';
import { getClient } from '@/utils/client';
import { useInfiniteQuery } from '@tanstack/react-query';

interface CallResponse {
  data: Call[];
  meta: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    page: number;
  };
}

const useGetAllCalls = () => {
  return useInfiniteQuery<CallResponse>({
    queryKey: ['calls'],
    queryFn: async ({ pageParam = 1 }) => {
      const token = await getToken();
      const page = typeof pageParam === 'number' ? pageParam : 1;
      const result = await getClient(`call?page=${page}&perPage=10`, token);
      return result;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasNextPage) return undefined;
      return lastPage.meta.page + 1;
    },
    initialPageParam: 1,
  });
};

export default useGetAllCalls;
