import { postClient } from "@/utils/client";
import { useState } from "react";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<LoginFormData | ErrorResponse | null>(null);

  const register = async (userData: LoginFormData) => {
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
    register,
    loading,
    error,
    data,
  };
};

export default useRegister;
