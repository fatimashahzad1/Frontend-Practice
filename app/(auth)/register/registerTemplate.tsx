import React, { ReactNode } from "react";
import Header from "./header";

interface RegisterTemplateProps {
  heading: string;
  text: string;
  stepNumber: string;
  stepName: string;
  children: ReactNode;
  backToLink: string;
}

const RegisterTemplate: any = ({
  heading,
  text,
  stepName,
  stepNumber,
  backToLink,
  children,
}: RegisterTemplateProps) => {
  return (
    <div className="sm:w-[53%] max-sm:w-full h-screen flex flex-col">
      <Header
        stepName={stepName}
        stepNumber={stepNumber}
        backToLink={backToLink}
      />
      <div className="xl:pl-32 lg:pl-24 md:pl-20 sm:pl-7 sm:min-w-[426px] sm:pr-56 max-sm:mx-5">
        <div className=" max-sm:flex max-sm:flex-col max-sm:justify-center items-center sm:min-w-[426px]">
          <div className="main-heading ">{heading}</div>
          <div className="paragraph-heading ">{text}</div>
        </div>
        <div className=" border-t-[1px] border-[#F5F5F5] sm:min-w-[426px]"></div>
        {children}
      </div>
    </div>
  );
};

export default RegisterTemplate;
