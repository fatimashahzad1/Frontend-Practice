'use client';
import LeftPanel from '@/components/auth/leftPanel';
import React from 'react';
import LoginForm from './loginForm';
import LoginTemplate from '@/components/auth/loginTemplate';
import OAuthButton from '../register/oauthButton';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  return (
    <div className='flex flex-row h-[1200px]'>
      <LeftPanel />
      <LoginTemplate text='Please sign in to continue' heading='Login'>
        <LoginForm />
        <div className='sm:min-w-[300px]  flex justify-between items-center my-6'>
          <hr className=' w-full border-[#F5F5F5] border-[1px] mr-8' />
          Or
          <hr className='w-full border-[#F5F5F5] border-[1px] ml-8' />
        </div>
        <Button
          variant='default'
          onClick={() => {
            router.push(ROUTES.account);
          }}
          className='bg-[#1565D8] h-[72px] text-white text-center py-6 text-base font-medium w-full mt-6 rounded-md mb-4'
        >
          Register Account
        </Button>
        <OAuthButton />
      </LoginTemplate>
    </div>
  );
};

export default Login;
