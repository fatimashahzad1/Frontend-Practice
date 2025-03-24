"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

interface HeaderProps {
  stepNumber: string;
  stepName: string;
  backToLink: string;
}

const Header = ({ stepName, stepNumber, backToLink }: HeaderProps) => {
  const router = useRouter();
  return (
    <div className="ml-12 mr-20 mt-16 mb-24 flex flex-row justify-between max-sm:mx-5">
      <Button
        onClick={() => router.back()}
        className=" flex flex-row items-center gap-2 text-primaryGrey font-semibold text-base"
      >
        <IoIosArrowBack className="w-5 h-5 text-primaryGrey" />
        Back
      </Button>
      <div className="">
        <div className="text-[#BDBDBD] text-sm font-medium">
          STEP {stepNumber}/03
        </div>
        <div className="text-primaryGrey text-base font-semibold">
          {stepName}
        </div>
      </div>
    </div>
  );
};

export default Header;
