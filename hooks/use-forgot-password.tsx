import { postClient } from '@/utils/client';
import { useCallback, useMemo, useState } from 'react';

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [data, setData] = useState<SuccessResponse | null>(null);

  const forgotPassword = useCallback(
    async (userData: ForgetPasswordFormData) => {
      setLoading(true);
      setError(null);

      try {
        const result = await postClient({
          url: `auth/password/forgot`,
          data: userData,
        });
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
    () => ({ forgotPassword, data, loading, error }),
    [data, loading, error, forgotPassword]
  );

  return memoizedData;
};

export default useForgotPassword;
