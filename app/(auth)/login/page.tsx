import LeftPanel from "@/components/leftPanel";
import React from "react";
import LoginForm from "./loginForm";
import LoginTemplate from "@/components/loginTemplate";
import OAuthButton from "../register/oauthButton";

const Login = () => {
  return (
    <div className="flex flex-row h-[1200px]">
      <LeftPanel />
      <LoginTemplate text="Please sign in to continue" heading="Login">
        <LoginForm />
        <div className="sm:min-w-[300px]  flex justify-between items-center my-6">
          <hr className=" w-full border-[#F5F5F5] border-[1px] mr-8" />
          Or
          <hr className="w-full border-[#F5F5F5] border-[1px] ml-8" />
        </div>
        <OAuthButton />
      </LoginTemplate>
    </div>
  );
};

export default Login;
