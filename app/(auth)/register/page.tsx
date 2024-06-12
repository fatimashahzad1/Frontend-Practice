import LeftPanel from "@/components/leftPanel";
import React from "react";
import RegisterTemplate from "./registerTemplate";

const Register = () => {
  return (
    <div className="flex flex-row">
      <LeftPanel />
      <RegisterTemplate />
    </div>
  );
};

export default Register;
