import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postClient } from '@/utils/client';
import { getToken } from '@/lib/get-token';
import { useToast } from './use-toast';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';

const useCreateJob = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jobData: CreateJobFormData) => {
      const token = await getToken();
      if (!token) {
        throw new Error('Token is Required!');
      }
      const result = await postClient({
        url: 'jobs',
        data: jobData,
        token,
      });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ROUTE_QUERY_KEYS.GET_ALL_POSTS],
      });

      toast({
        variant: 'default',
        title: 'Success',
        description: 'Job created Successfully',
      });
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        title: err.message,
        description: 'Failed to create Job',
      });
    },
  });
};

export default useCreateJob;
