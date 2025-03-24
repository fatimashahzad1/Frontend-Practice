import { useInfiniteQuery } from '@tanstack/react-query';
import { getToken } from '@/lib/get-token';
import { getClient } from '@/utils/client';
import { useToast } from '@/hooks/use-toast';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';

const PER_PAGE = 5; // Number of posts per request

const fetchAllPosts = async ({
  pageParam = 0,
  postType,
  toast,
}: {
  pageParam: number;
  postType: number;
  toast: any;
}) => {
  const token = await getToken();
  if (!token) throw new Error('Token is Missing');
  const result = await getClient(
    `post/${postType}?page=${pageParam}&perPage=${PER_PAGE}`,
    token
  );
  return result;
};

export const usePosts = (postType?: number) => {
  const { toast } = useToast();

  return useInfiniteQuery({
    queryKey: [ROUTE_QUERY_KEYS.GET_ALL_POSTS, postType],
    queryFn: ({ pageParam = 0 }) =>
      fetchAllPosts({ pageParam, postType: postType!, toast }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PER_PAGE ? allPages.length : undefined, // Fetch next only if we got full data
    staleTime: 24 * 60 * 60 * 1000,
    enabled: postType !== undefined, // ✅ Only fetch when postType is valid
    throwOnError: true,
  });
};
