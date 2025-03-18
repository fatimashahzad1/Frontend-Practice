import { getToken } from '@/lib/get-token';
import { putClient } from '@/utils/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';

const useChangeUserDetails = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      data,
      reauthenticate = false,
    }: {
      data: ChangeUserDetailsFormData;
      reauthenticate?: boolean;
    }) => {
      const token = await getToken();
      const { id, ...user } = data;
      if (!token) {
        throw new Error('Token Missing');
      }

      return putClient({
        url: `users/${id}?reauthenticate=${reauthenticate}`,
        data: user,
        token,
      });
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: [ROUTE_QUERY_KEYS.USER_DETAILS],
      });
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
