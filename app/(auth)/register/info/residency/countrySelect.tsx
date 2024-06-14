"use client";
import React, { useState } from "react";
import { getCountries } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import "react-phone-number-input/style.css";

interface CountrySelectProps {
  register: any;
  error: any;
  name: any;
}

const CountrySelect = ({ register, error, name }: CountrySelectProps) => {
  return (
    <div className="flex flex-col mt-6 ">
      <label htmlFor={name} className="input-label">
        Country of residence
      </label>
      <select
        className={`w-full border-[1px] border-[#8692A6] py-6 px-8 rounded-md mt-3 bg-transparent focus:border-[#1565D8] focus:outline-none focus:border-[1px] focus:shadow-input`}
        {...register}
      >
        <option key="Select value" value="">
          Please select
        </option>
        {getCountries().map((country) => {
          return (
            <option key={country} value={country} className="text-black">
              {en[country]}
            </option>
          );
        })}
      </select>
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
};

export default CountrySelect;
