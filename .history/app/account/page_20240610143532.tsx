import React from "react";
import AccountType from "./accountType";
import "./account.module.scss";
const Account = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[47%] h-screen bg-[url('/assets/background.png')] bg-cover bg-no-repeat"></div>
      <AccountType />
    </div>
  );
};

export default Account;
