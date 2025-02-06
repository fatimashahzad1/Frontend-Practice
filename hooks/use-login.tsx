import { ROUTES } from "@/constants/routes";
import { postClient } from "@/utils/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<RegisterFormData | ErrorResponse | null>(
    null
  );
  const router = useRouter();

  const login = async (userData: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await postClient({ url: `auth/login`, data: userData });
      setData(result);
      router.push(ROUTES.feed);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
    data,
  };
};

export default useLogin;
