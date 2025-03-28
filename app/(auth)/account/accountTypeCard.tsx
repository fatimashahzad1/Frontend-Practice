'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiBriefcase } from 'react-icons/fi';

import { TfiArrowRight } from 'react-icons/tfi';
interface AccountTypeCardProps {
  type: 'business' | 'individual';
  href: string;
}

const AccountTypeCard = ({ type, href }: AccountTypeCardProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className=" h-[108px] max-sm:max-w-[335px] sm:w-full bg-white shadow-custom rounded-md hover:bg-hoverBlue p-7 hover:border-primary hover:border-[1px] flex flex-row justify-center items-center mb-7"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div
        className={`min-h-[52px] min-w-[52px] max-sm:min-w-[40px] max-sm:min-h-[40px] ${
          hovered
            ? "bg-[url('/assets/Polygon1.png')]"
            : "bg-[url('/assets/Polygon2.png')]"
        } bg-contain bg-no-repeat flex justify-center items-center`}
      >
        {type === 'business' ? (
          <FiBriefcase
            className={`w-5 h-5 ${hovered ? 'text-white' : 'text-primary'}`}
          />
        ) : (
          <BsPerson
            className={`w-5 h-5 ${hovered ? 'text-white' : 'text-primary'}`}
          />
        )}
      </div>

      <div className="flex flex-col ml-7">
        <div className="font-medium text-lg">
          {type === 'business' ? 'Business' : 'Individual'}
        </div>
        <div className="font-normal text-sm text-primaryGrey">
          {type === 'business'
            ? 'Own or belong to a company, this is for you.'
            : 'Personal account to manage all you activities.'}
        </div>
      </div>
      <div className="w-5 h-5">
        {hovered && <TfiArrowRight className="text-primary w-full h-full" />}
      </div>
    </Link>
  );
};

export default AccountTypeCard;
