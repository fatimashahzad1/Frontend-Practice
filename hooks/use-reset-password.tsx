import { postClient } from "@/utils/client";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";

const useResetPassword = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({
      data,
      token,
    }: {
      data: ResetPasswordFormData;
      token: string | null;
    }) => {
      if (!token) {
        throw new Error("Token is required!");
      }

      return await postClient({
        url: `auth/password/reset?token=${token}`,
        data,
      });
    },

    onSuccess: (data) => {
      console.log("Password reset successful!", data);
      toast({
        variant: "default",
        title: data?.success,
        description: data?.message,
      });
    },
    onError: (error) => {
      console.error("Error resetting password", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
};

export default useResetPassword;
