import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postClient } from '@/utils/client';
import { getToken } from '@/lib/get-token';
import { useToast } from './use-toast';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';

const useCreateArticle = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (articleData: {
      title: string;
      description: string;
      estimatedTime: string;
      articleImage: string | undefined;
    }) => {
      const token = await getToken();
      if (!token) {
        throw new Error('Token is Required!');
      }

      const result = await postClient({
        url: 'article',
        data: articleData,
        token,
      });
      if (result.statusCode >= 400) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: [ROUTE_QUERY_KEYS.GET_ALL_ARTICLES],
      });

      toast({
        variant: 'default',
        title: 'Success',
        description: 'Article created Successfully',
      });
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        title: err.message,
        description: 'Failed to create Article',
      });
    },
  });
};

export default useCreateArticle;
