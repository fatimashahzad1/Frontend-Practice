'use client';
import { useEffect } from 'react';

import LeftPanel from '@/components/auth/leftPanel';
import LoginTemplate from '@/components/auth/loginTemplate';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import useVerification from '@/hooks/use-verification';

const VerificationPage = () => {
  const router = useRouter();

  const token = useSearchParams().get('token');
  const { data, error, verification } = useVerification();

  useEffect(() => {
    if (token) {
      verification(token);
    }
  }, [token, verification]);

  return (
    <div className="flex flex-row h-[100vh]">
      <LeftPanel />
      <LoginTemplate
        text="Verification of the registered account"
        heading="Account Verification"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center py-12 px-6">
          <h1 className="text-2xl font-semibold">{data?.message}</h1>
          {error && <p className="text-red-600">{error.message}</p>}
          <p className="text-lg">
            {data?.success && (
              <span>Your account has been successfully verified.</span>
            )}
          </p>
          <button
            onClick={() => router.push(ROUTES.login)}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-all"
          >
            Go to Login
          </button>
        </div>
      </LoginTemplate>
    </div>
  );
};

export default VerificationPage;
