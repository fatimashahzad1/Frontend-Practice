"use client";
import React, { forwardRef, LegacyRef, useState } from "react";

import ReactCountryFlag from "react-country-flag";
import PropTypes from "prop-types";
import en from "react-phone-number-input/locale/en";
import Input, {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import { CountryCode } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import { useController, useFormContext } from "react-hook-form";
const CountrySelect = ({
  value,
  onChange,
  labels,
  ...rest
}: {
  value: any;
  onChange: any;
  labels: any;
}) => {
  return (
    <select
      className="ml-3 h-16 focus:outline-none bg-transparent bg-red-500 pr-6"
      {...rest}
      value={`${value}`}
      onChange={(event) => {
        return onChange(event.target.value || undefined);
      }}
    >
      {getCountries().map((country) => {
        return (
          <option
            key={country}
            value={country}
            className="w-full flex flex-row justify-center "
          >
            +{getCountryCallingCode(country)}
          </option>
        );
      })}
    </select>
  );
};

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
};

const CustomInput = forwardRef(
  (
    {
      value,
      onChange,
      ...props
    }: { value?: string; onChange?: (val: string) => void },
    ref: LegacyRef<HTMLInputElement>,
  ) => (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange && onChange("000000000")}
      ref={ref}
      {...props}
      className="h-16 w-full focus:outline-none bg-transparent"
      placeholder="Enter phone number"
    />
  ),
);
CustomInput.displayName = "CustomInput";

interface PhoneNumberInputProps {
  name: string;
}

const PhoneNumberInput = ({ name }: PhoneNumberInputProps) => {
  const [country, setCountry] = useState("PK");

  const { control } = useFormContext();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="flex flex-col my-6 ">
      <label htmlFor={name} className="input-label">
        Phone number
      </label>
      <div
        className={`flex flex-row justify-center items-center border-[1px] pl-8 rounded-md mt-3 bg-transparent border-[#8692A6] focus-within:border-[#1565D8] focus-within:shadow-input`}
      >
        <ReactCountryFlag
          className=""
          countryCode={country}
          style={{
            fontSize: "2em",
            lineHeight: "2em",
          }}
          svg
        />
        <CountrySelect labels={en} value={country} onChange={setCountry} />
        <Input
          name={name}
          country={country as CountryCode}
          value={value}
          inputComponent={CustomInput}
          onChange={(number) => {
            onChange(number);
          }}
          international
        />
      </div>
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
};

export default PhoneNumberInput;
