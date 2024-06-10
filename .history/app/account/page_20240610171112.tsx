import React from "react";
import AccountType from "./accountType";
import "./account.scss";
import Image from "next/image";
const Account = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[47%] h-screen bg-[url('/assets/background.png')] bg-cover bg-no-repeat">
        <Image src="./assets/bitsolLogo" />
      </div>
      <AccountType />
    </div>
  );
};

export default Account;
