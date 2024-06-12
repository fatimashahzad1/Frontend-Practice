import Link from "next/link";
import React from "react";
import AccountTypeCard from "./accountTypeCard";

const AccountType = () => {
  return (
    <div className="w-[53%] max-sm:w-full h-screen flex flex-col">
      <div className="text-style">
        Already have an account?{" "}
        <Link href="/account" className="link">
          Sign In
        </Link>
      </div>
      <div className=" mt-[135px] max-sm:flex max-sm:flex-col max-sm:px-5 min-w-[335px] sm:max-w-[426px] justify-center items-center sm:ml-[16%] sm:mr-[28%]">
        <div className="main-heading">Join Us!</div>
        <div className="paragraph-heading">
          To begin this journey, tell us what type of account you’d be opening.
        </div>

        <AccountTypeCard type="individual" />
        <AccountTypeCard type="business" />
      </div>
    </div>
  );
};

export default AccountType;
