import { deleteClient } from '@/utils/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';
import { getToken } from '@/lib/get-token';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';

const useDeletePost = (postType: number) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId?: number) => {
      const token = await getToken();
      if (!token) {
        throw new Error('Token is required!');
      }

      return await deleteClient({
        url: `post/${postId}`,
        token,
      });
    },

    onSuccess: async (data) => {
      console.log('Post deleted successfully!', data);
      toast({
        variant: 'default',
        title: data?.success,
        description: data?.message,
      });
      queryClient.invalidateQueries({
        queryKey: [ROUTE_QUERY_KEYS.GET_ALL_POSTS, postType],
      });
    },
    onError: (error) => {
      console.error('Error in Post delete', error.message);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    },
  });
};

export default useDeletePost;
