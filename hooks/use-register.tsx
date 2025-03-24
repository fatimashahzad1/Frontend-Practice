import { postClient } from '@/utils/client';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';
import { ROUTES } from '@/constants/routes';

const useRegister = () => {
  const { toast } = useToast();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (userData: LoginFormData) => {
      return await postClient({ url: `auth/register`, data: userData });
    },
    onSuccess: (data) => {
      toast({
        variant: 'default',
        title: data.success,
        description: data.message,
      });
      router.push(ROUTES.login);
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.error,
        description: error.message,
      });
    },
  });

  return {
    register: mutation.mutate, // Function to call for registration
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};

export default useRegister;
