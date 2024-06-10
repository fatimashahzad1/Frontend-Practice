"use client";
import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";

const AccountTypeCard = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="max-w-[426px] h-[108px] m-7 bg-white shadow-custom rounded-md bg-primaryBlue hover:bg-hoverBlue p-7 hover:border-primaryBlue hover:border-[1px]"
      onMouseEnter={() => {
        console.log("true");
        setHovered(true);
      }}
      onMouseLeave={() => {
        console.log("false");
        setHovered(false);
      }}
    >
      <div
        className={`h-[52px] w-[52px] ${
          hovered
            ? "bg-[url('/assets/Polygon2.png')]"
            : "bg-[url('/assets/Polygon1.png')]"
        } bg-contain bg-no-repeat flex justify-center items-center`}
      >
        <BsPerson className="w-5 h-5 text-black hover:text-white" />
      </div>
      AccountTypeCard
    </div>
  );
};

export default AccountTypeCard;
