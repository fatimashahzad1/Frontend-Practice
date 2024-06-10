"use client";
import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { LiaArrowRightSolid } from "react-icons/lia";
import { TfiArrowRight } from "react-icons/tfi";

const AccountTypeCard = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="max-w-[426px] h-[108px] m-7 bg-white shadow-custom rounded-md bg-primaryBlue hover:bg-hoverBlue p-7 hover:border-primaryBlue hover:border-[1px] flex flex-row gap-7 justify-center items-center"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div
        className={`h-[52px] w-[52px] ${
          hovered
            ? "bg-[url('/assets/Polygon1.png')]"
            : "bg-[url('/assets/Polygon2.png')]"
        } bg-cover bg-no-repeat flex justify-center items-center`}
      >
        <BsPerson
          className={`w-5 h-5 ${hovered ? "text-white" : "text-primaryBlue"}`}
        />
      </div>

      <div className="flex flex-col ">
        <div className="font-medium text-lg">Individual</div>
        <div className="font-normal text-sm text-primaryGrey">
          Personal account to manage all you activities.
        </div>
      </div>
      {hovered && <TfiArrowRight className="text-primaryBlue w-5 h-5" />}
    </div>
  );
};

export default AccountTypeCard;
