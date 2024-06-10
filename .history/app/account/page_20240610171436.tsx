import React from "react";
import AccountType from "./accountType";
import "./account.scss";
import Image from "next/image";
import logo from "@/public/assets/bitsolLogo.png";
const Account = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[47%] h-screen bg-[url('/assets/background.png')] bg-cover bg-no-repeat">
        <Image
          src={logo}
          alt=""
          className="max-w-[90px] h-[48] ml-[82pc] mt-[46px]"
        />
      </div>
      <AccountType />
    </div>
  );
};

export default Account;
