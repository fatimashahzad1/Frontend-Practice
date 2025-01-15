import React, { ReactNode } from "react";

interface LoginTemplateProps {
  children: ReactNode;
  heading: string;
  text: string;
}

const LoginTemplate = ({ children, heading, text }: LoginTemplateProps) => {
  return (
    <div className="sm:w-[53%] max-sm:w-full h-full flex flex-col justify-center items-center">
      <div className="w-full xl:pl-32 lg:pl-24 md:pl-20 sm:pl-7 sm:pr-56 max-sm:px-5">
        <div className=" max-sm:flex max-sm:flex-col max-sm:justify-center items-center sm:min-w-[426px]">
          <div className="main-heading ">{heading}</div>
          <div className="paragraph-heading-login">{text}</div>
        </div>
        <div className=" border-t-[1px] border-[#F5F5F5] sm:min-w-[426px] mb-6"></div>
        {children}
      </div>
    </div>
  );
};

export default LoginTemplate;
