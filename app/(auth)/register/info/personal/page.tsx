import LeftPanel from "@/components/leftPanel";
import React from "react";
import RegisterTemplate from "../../registerTemplate";
import RegisterForm from "../../registerForm";
import OAuthButton from "../../oauthButton";

const Register = () => {
  return (
    <div className="flex flex-row ">
      <LeftPanel />
      <RegisterTemplate
        heading="Register Individual Account!"
        text="For the purpose of industry regulation, your details are required."
        stepNumber="01"
        stepName="Personal Info."
        backToLink="/account"
      >
        <RegisterForm />
        <div className="sm:min-w-[300px] md:min-w-[335px] lg:min-w-[426px] flex justify-between items-center my-6">
          <hr className=" w-full border-[#F5F5F5] border-[1px] mr-8" />
          Or
          <hr className="w-full border-[#F5F5F5] border-[1px] ml-8" />
        </div>
        <OAuthButton />
      </RegisterTemplate>
    </div>
  );
};

export default Register;
