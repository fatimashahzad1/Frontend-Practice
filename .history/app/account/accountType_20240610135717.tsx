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
      <div>Join Us!</div>
    </div>
  );
};

export default AccountType;
