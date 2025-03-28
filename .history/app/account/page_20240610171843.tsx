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
          className="max-w-[90px] h-[48] ml-[82px] mt-[46px]"
        />
        <p className="mt-[276px] max-w-[473px] font-normal text-xl ml-[82px]">
          The passage experienced a surge in popularity during the 1960s when
          Letraset used it on their dry-transfer sheets, and again during the
          90s as desktop publishers bundled the text with their software.
        </p>
      </div>
      <AccountType />
    </div>
  );
};

export default Account;
