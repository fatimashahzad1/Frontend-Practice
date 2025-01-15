import LeftPanel from "@/components/leftPanel";
import LoginTemplate from "@/components/loginTemplate";
import React from "react";
import ResetPasswordForm from "./resetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="flex flex-row h-[1200px]">
      <LeftPanel />
      <LoginTemplate
        text="Please enter the email you would like your password reset information sent to "
        heading="Forgot Password?"
      >
        <ResetPasswordForm />
      </LoginTemplate>
    </div>
  );
};

export default ResetPassword;
