import { postClient } from "@/utils/client";
import { useCallback, useMemo, useState } from "react";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [data, setData] = useState<SuccessResponse | null>(null);

  const resetPassword = useCallback(
    async (userData: ResetPasswordFormData, token: string | null) => {
      if (!token) {
        setError({
          error: "Token Missing",
          message: "Token is Required!",
          statusCode: 400,
        });

        return;
      }
      setLoading(true);
      setError(null);

      try {
        const result = await postClient(
          `auth/password/reset?token=${token}`,
          userData
        );
        if (result?.error) {
          setError(result);
        } else {
          setData(result);
        }
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const memoizedData = useMemo(
    () => ({ resetPassword, data, loading, error }),
    [data, loading, error, resetPassword]
  );

  return memoizedData;
};

export default useResetPassword;
