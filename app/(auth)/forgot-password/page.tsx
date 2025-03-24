import LeftPanel from '@/components/auth/leftPanel';
import LoginTemplate from '@/components/auth/loginTemplate';
import React from 'react';
import ForgotPasswordForm from './forgotPasswordForm';

const ForgotPassword = () => {
  return (
    <div className="flex flex-row h-screen justify-center">
      <LeftPanel />
      <LoginTemplate
        text="Please enter the email you would like your password reset information sent to "
        heading="Forgot Password?"
      >
        <ForgotPasswordForm />
      </LoginTemplate>
    </div>
  );
};

export default ForgotPassword;
