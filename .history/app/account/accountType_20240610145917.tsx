import AccountTypeCard from "@/components/accountTypeCard";
import Link from "next/link";
import React from "react";

const AccountType = () => {
  return (
    <div className="w-[53%] h-screen flex flex-col">
      <div className="text-style">
        Already have an account?{" "}
        <Link href="/account" className="link">
          Sign In
        </Link>
      </div>
      <div className="mt-[135px] ml-[127px]">
        <div className="main-heading">Join Us!</div>
        <div className="paragraph-heading">
          To begin this journey, tell us what type of account you’d be opening.
        </div>
        <AccountTypeCard />
      </div>
    </div>
  );
};

export default AccountType;
