import LeftPanel from "@/components/leftPanel";
import React from "react";
import RegisterTemplate from "../../registerTemplate";

const Residency = () => {
  return (
    <div className="flex flex-row">
      <LeftPanel />
      <RegisterTemplate
        heading="Complete Your Profile!"
        text="For the purpose of industry regulation, your details are required."
        stepNumber="02"
        stepName="Residency Info."
      ></RegisterTemplate>
    </div>
  );
};

export default Residency;
