import { deleteClient } from "@/utils/client";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { getToken, removeToken } from "@/lib/get-token";
import { useRouter } from "next/navigation";

const useDeleteUser = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: async (id?: number) => {
      const token = await getToken();
      if (!token) {
        throw new Error("Token is required!");
      }

      return await deleteClient({
        url: `users/${id}`,
        token,
      });
    },

    onSuccess: async (data) => {
      console.log("User deleted successfully!", data);
      await removeToken();
      router.push("/");

      toast({
        variant: "default",
        title: data?.success,
        description: data?.message,
      });
    },
    onError: (error) => {
      console.error("Error in User delete", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
};

export default useDeleteUser;
