import { postClient } from "@/utils/client";
import { useState } from "react";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<RegisterFormData | ErrorResponse | null>(
    null
  );

  const login = async (userData: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await postClient(`auth/login`, userData);
      setData(result);
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
