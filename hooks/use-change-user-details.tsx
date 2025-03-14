import { getToken } from '@/lib/get-token';
import { patchClient } from '@/utils/client';
import { useMutation } from '@tanstack/react-query';
import { useToast } from './use-toast';

const useChangeUserDetails = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (data: ChangeUserDetailsFormData) => {
      const token = await getToken();
      const { id, ...user } = data;
      if (!token) {
        throw new Error('Token Missing');
      }

      return patchClient({
        url: `users/${id}`,
        data: user,
        token,
      });
    },
    onSuccess: (result) => {
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Information Changed Successfully',
      });
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        title: err.message,
        description: 'Failed to Update',
      });
    },
  });

  return {
    changeUserDetails: mutation.mutate,
    loading: mutation.isPending,
    error: mutation.error as ErrorResponse | null,
    data: mutation.data as SuccessResponse | undefined,
  };
};

export default useChangeUserDetails;
