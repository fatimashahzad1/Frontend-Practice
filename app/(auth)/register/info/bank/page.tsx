"use client";
import LeftPanel from "@/components/auth/leftPanel";
import React from "react";
import RegisterTemplate from "../../registerTemplate";
import BankForm from "./bankForm";

const Bank = () => {
  return (
    <div className="flex flex-row h-screen">
      <LeftPanel />
      <RegisterTemplate
        heading="Complete Your Profile!"
        text="For the purpose of industry regulation, your details are required."
        stepNumber="03"
        stepName="Bank Verification"
        backToLink="/register/info/residency"
      >
        <BankForm />
      </RegisterTemplate>
    </div>
  );
};

export default Bank;
