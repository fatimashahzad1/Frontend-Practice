import React from "react";
import { BsPerson } from "react-icons/bs";

const AccountTypeCard = () => {
  return (
    <div className="max-w-[426px] h-[108px] m-7 bg-white shadow-custom rounded-md bg-primaryBlue hover:bg-hoverBlue p-7">
      <div className="h-[52px] w-[52px] bg-[url('/assets/Polygon1.png')] bg-contain bg-no-repeat flex justify-center items-center">
        <BsPerson color="white" height={20} />
      </div>
      AccountTypeCard
    </div>
  );
};

export default AccountTypeCard;
