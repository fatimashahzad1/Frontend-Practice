"use client";
import React, { useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import ReactCountryFlag from "react-country-flag";
import PropTypes from "prop-types";
import en from "react-phone-number-input/locale/en";
import Input from "react-phone-number-input/input";
import { CountryCode, E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
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
  console.log(
    `value=${value}, onChange=${value}, labels=${labels}, rest=${rest}`
  );
  return (
    <select
      className="ml-3 h-16  focus:outline-none bg-transparent"
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

interface PhoneNumberInputProps {
  register: any;
  error: any;
  name: string;
}

const PhoneNumberInput = ({ register, error, name }: PhoneNumberInputProps) => {
  const [country, setCountry] = useState("PK");
  const [value, setValue] = useState();

  return (
    <div className="flex flex-col my-6 ">
      <label htmlFor={name} className="input-label">
        Phone number
      </label>
      <div className="flex flex-row justify-center items-center border-[1px] border-[#8692A6] pl-8 rounded-md mt-3 bg-transparent focus:border-[#1565D8] focus:outline-none focus:border-[1px] focus:shadow-input">
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
          country={country as CountryCode}
          value={value}
          onChange={() => setValue}
          international
          inputComponent={() => {
            return (
              <input
                type="text"
                className="h-16 pl-9 w-full focus:outline-none bg-transparent"
                placeholder="Enter phone number"
                {...register}
              />
            );
          }}
        />
      </div>
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
};

export default PhoneNumberInput;
