import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const Header = () => {
  return (
    <div className="ml-12 mr-20  mt-16 mb-24 flex flex-row justify-between max-sm:mx-5">
      <Link
        href="/register"
        className=" flex flex-row items-center gap-2 text-primaryGrey font-semibold text-base"
      >
        <IoIosArrowBack className="w-5 h-5 text-primaryGrey" />
        Back
      </Link>
      <div className="">
        <div className="text-[#BDBDBD] text-sm font-medium">STEP 01/03</div>
        <div className="text-primaryGrey text-base font-semibold">
          Personal Info.
        </div>
      </div>
    </div>
  );
};

export default Header;
