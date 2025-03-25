import { getToken } from '@/lib/get-token';
import { getClient } from '@/utils/client';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchAllJobs = async ({
  pageParam,
  perPage,
}: {
  pageParam: number;
  perPage: number;
}) => {
  const token = await getToken();
  if (!token) throw new Error('Token is Missing');
  const result = await getClient(
    `jobs/all?page=${pageParam}&perPage=${perPage}`,
    token
  );
  return result;
};

export const useJobs = ({
  pageParam = 0,
  perPage = 5,
}: {
  pageParam?: number;
  perPage?: number;
}) => {
  return useInfiniteQuery({
    queryKey: [ROUTE_QUERY_KEYS.GET_ALL_JOBS],
    queryFn: ({ pageParam }) => fetchAllJobs({ pageParam, perPage }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.length === perPage ? lastPage.length : undefined,
    staleTime: 24 * 60 * 60 * 1000,
    throwOnError: true,
  });
};
