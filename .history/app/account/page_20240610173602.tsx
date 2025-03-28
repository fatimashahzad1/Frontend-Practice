import React from "react";
import AccountType from "./accountType";
import "./account.scss";
import Image from "next/image";
import logo from "@/public/assets/bitsolLogo.png";
import commas from "@/public/assets/commas.png";

import check from "@/public/assets/circleCheckFull.png";
const Account = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[47%] h-screen bg-[url('/assets/background.png')] bg-cover bg-no-repeat">
        <Image
          src={logo}
          alt=""
          className="max-w-[90px] h-[48] ml-[82px] mt-[46px]"
        />
        <Image
          src={commas}
          alt=""
          className="max-w-[28px] ml-[82px] mt-[236px]"
        />
        <p className="mt-10 max-w-[473px] font-normal text-xl ml-[82px] text-white">
          The passage experienced a surge in popularity during the 1960s when
          Letraset used it on their dry-transfer sheets, and again during the
          90s as desktop publishers bundled the text with their software.
        </p>
        <p className="mt-[22px] max-w-[473px] font-medium text-lg ml-[82px] text-white flex">
          Vincent Obi
          <Image src={check} alt="" className="w-4 h-4" />
        </p>
      </div>
      <AccountType />
    </div>
  );
};

export default Account;
