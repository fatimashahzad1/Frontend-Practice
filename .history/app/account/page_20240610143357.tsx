import React from "react";
import AccountType from "./accountType";
import "@/app/styles/account.scss";
const Account = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[47%] h-screen bg-[url('/assets/background.png')] bg-cover"></div>
      <AccountType />
    </div>
  );
};

export default Account;
