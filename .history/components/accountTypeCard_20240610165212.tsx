"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FiBriefcase } from "react-icons/fi";

import { TfiArrowRight } from "react-icons/tfi";
interface AccountTypeCardProps {
  type: "business" | "individual";
}

const AccountTypeCard = ({ type }: AccountTypeCardProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/account"
      className="max-w-[426px] h-[108px] bg-white shadow-custom rounded-md hover:bg-hoverBlue p-7 hover:border-primaryBlue hover:border-[1px] flex flex-row justify-center items-center"
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
        } bg-contain bg-no-repeat flex justify-center items-center`}
      >
        {type === "business" ? (
          <FiBriefcase />
        ) : (
          <BsPerson
            className={`w-5 h-5 ${hovered ? "text-white" : "text-primaryBlue"}`}
          />
        )}
      </div>

      <div className="flex flex-col ml-7">
        <div className="font-medium text-lg">
          {type === "business" ? "Business" : "Individual"}
        </div>
        <div className="font-normal text-sm text-primaryGrey">
          {type === "business"
            ? "Own or belong to a company, this is for you."
            : "Personal account to manage all you activities."}
        </div>
      </div>
      <div className="w-5 h-5">
        {hovered && (
          <TfiArrowRight className="text-primaryBlue w-full h-full" />
        )}
      </div>
    </Link>
  );
};

export default AccountTypeCard;
