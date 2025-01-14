"use client";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { getCountries } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import "react-phone-number-input/style.css";

interface CountrySelectProps {
  name: any;
}

const CountrySelect = ({ name }: CountrySelectProps) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({ name, control });
  return (
    <div className="flex flex-col mt-6 ">
      <label htmlFor={name} className="input-label">
        Country of residence
      </label>
      <select
        className={`country w-full border-[1px] border-[#8692A6] py-6 px-8 rounded-md mt-3 bg-transparent focus:border-[#1565D8] focus:outline-none focus:border-[1px] focus:shadow-input`}
        value={value || ""}
        onChange={onChange}
        name={name}
        ref={ref}
      >
        <option key="Select value" value="">
          Please select
        </option>
        {getCountries().map((country) => {
          return (
            <option key={country} value={en[country]} className="text-black">
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
