import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/lib/get-token';
import { getClient } from '@/utils/client';
import { useToast } from '@/hooks/use-toast';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';

const fetchAllPosts = async (toast: any, postType: number) => {
  const token = await getToken();
  if (!token) throw new Error('Token is Missing');

  const result = await getClient(`post/${postType}`, token);
  if (result?.statusCode >= 400) {
    toast({
      title: 'Error',
      description: 'Failed to fetch posts',
      variant: 'destructive',
    });
  }

  return result;
};

export const usePosts = (postType?: number) => {
  const { toast } = useToast();

  return useQuery<Post[]>({
    queryKey: [ROUTE_QUERY_KEYS.GET_ALL_POSTS, postType],
    queryFn: () => fetchAllPosts(toast, postType!),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: postType !== undefined, // ✅ Only fetch when postType is valid
  });
};
