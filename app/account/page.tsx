import React from "react";
import AccountType from "./accountType";
import "./account.scss";

import LeftPanel from "@/components/leftPanel";
const Account = () => {
  return (
    <div className="flex flex-row">
      <LeftPanel />
      <AccountType />
    </div>
  );
};

export default Account;
