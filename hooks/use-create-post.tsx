import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postClient } from '@/utils/client';
import { getToken } from '@/lib/get-token';
import { useToast } from './use-toast';
import { ROUTE_QUERY_KEYS } from '@/constants/routes';

const useCreatePost = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (postData: {
            content: string;
            postImage: string | null;
            type: number;
            authorId: number;
        }) => {
            const token = await getToken();
            if (!token) {
                throw new Error('Token is Required!');
            }

            const result = await postClient({
                url: 'post',
                data: postData,
                token,
            });
            if (result.statusCode >= 400) {
                throw new Error(result.message);
            }
            return result;
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries({
                queryKey: [ROUTE_QUERY_KEYS.GET_ALL_POSTS],
            });

            toast({
                variant: 'default',
                title: 'Success',
                description: 'Post created Successfully',
            });
        },
        onError: (err: any) => {
            toast({
                variant: 'destructive',
                title: err.message,
                description: 'Failed to create Post',
            });
        },
    });
};

export default useCreatePost;
