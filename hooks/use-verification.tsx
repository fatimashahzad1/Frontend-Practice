import { patchClient } from "@/utils/client";
import { useCallback, useMemo, useState } from "react";

const useVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [data, setData] = useState<SuccessResponse>({
    message: "Verifying...",
  });

  const verification = useCallback(async (token: string | null) => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError({
        error: "Token Missing",
        message: ["Token is Required!"],
        statusCode: 400,
      });
      return;
    }

    try {
      const result = await patchClient({
        url: `auth/verification?token=${token}`,
        data: {
          isVerified: true,
        },
      });
      if (result?.error) {
        setError(result);
      } else {
        setData(result);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const memoizedValues = useMemo(
    () => ({
      verification,
      loading,
      error,
      data,
    }),
    [verification, loading, error, data],
  );

  return memoizedValues;
};

export default useVerification;
