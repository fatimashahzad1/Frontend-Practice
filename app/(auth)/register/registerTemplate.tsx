import React from "react";
import RegisterForm from "./registerForm";
import Header from "./header";
import OAuthButton from "./oauthButton";

const RegisterTemplate = () => {
  return (
    <div className="sm:w-[53%] max-sm:w-full h-screen flex flex-col">
      <Header />
      <div className="xl:pl-32 lg:pl-24 md:pl-20 sm:pl-7 sm:min-w-[426px] sm:pr-56 max-sm:mx-5">
        <div className=" max-sm:flex max-sm:flex-col max-sm:justify-center items-center sm:min-w-[426px]">
          <div className="main-heading ">Register Individual Account!</div>
          <div className="paragraph-heading ">
            For the purpose of industry regulation, your details are required.
          </div>
        </div>
        <div className=" border-t-[1px] border-[#F5F5F5] sm:min-w-[426px]"></div>
        <RegisterForm />
        <div className="sm:min-w-[426px] flex justify-between items-center my-6">
          <hr className=" w-full border-[#F5F5F5] border-[1px] mr-8" />
          Or
          <hr className="w-full border-[#F5F5F5] border-[1px] ml-8" />
        </div>
        <OAuthButton />
      </div>
    </div>
  );
};

export default RegisterTemplate;
