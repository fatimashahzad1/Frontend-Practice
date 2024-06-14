"use client";
import React, { useState } from "react";
import { getCountries } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import "react-phone-number-input/style.css";
const CountrySelect = () => {
  const [value, setValue] = useState();
  return (
    <select
      className="w-full border-[1px] border-[#8692A6] py-6 px-8 rounded-md mt-3 bg-transparent focus:border-[#1565D8] focus:outline-none focus:border-[1px] focus:shadow-input"
      value={`${value}`}
      onChange={(event) => setValue(event.target.value)}
    >
      <option
        key="Select value"
        className="text-[#8692A6] font-medium text-sm"
        value=""
      >
        Please select
      </option>
      {getCountries().map((country) => {
        return (
          <option key={country} value={country}>
            {en[country]}
          </option>
        );
      })}
    </select>
  );
};

export default CountrySelect;
