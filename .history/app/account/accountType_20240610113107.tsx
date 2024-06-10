import Link from "next/link";
import React from "react";

const AccountType = () => {
  return (
    <div className="w-[53%] h-screen flex flex-col">
      <div>
        Already have an account? <Link href="/account">Sign In</Link>
      </div>
    </div>
  );
};

export default AccountType;
