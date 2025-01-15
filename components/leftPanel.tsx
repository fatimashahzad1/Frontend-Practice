import Image from "next/image";
import React from "react";
import logo from "@/public/assets/bitsolLogo.png";
import commas from "@/public/assets/commas.png";
import check from "@/public/assets/circleCheckFull.png";

const LeftPanel = () => {
  return (
    <div className="max-sm:hidden w-[47%] bg-[url('/assets/background.png')] bg-cover bg-no-repeat">
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
      <p className="mt-10 max-w-[473px] h-[190px] overflow-y-hidden text-ellipsis font-normal text-xl ml-[82px] mr-[111px] text-white">
        The passage experienced a surge in popularity during the 1960s when
        Letraset used it on their dry-transfer sheets, and again during the 90s
        as desktop publishers bundled the text with their software.
      </p>
      <p className="mt-[22px] max-w-[473px] font-medium text-lg ml-[82px] text-white whitespace-normal flex items-center">
        Vincent Obi
        <Image src={check} alt="" className="w-4 h-4 ml-3" />
      </p>
    </div>
  );
};

export default LeftPanel;
