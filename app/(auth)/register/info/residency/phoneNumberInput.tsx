"use client";
import React, { LegacyRef, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import ReactCountryFlag from "react-country-flag";
import PropTypes from "prop-types";
import en from "react-phone-number-input/locale/en";
import Input from "react-phone-number-input/input";
import { CountryCode } from "libphonenumber-js/core";
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
      className="ml-3 h-16 focus:outline-none bg-transparent bg-red-500"
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
  const [selectFocused, setSelectFocused] = useState(false);
  const [country, setCountry] = useState("PK");
  const [value, setValue] = useState();

  const mouseDownHandler = () => {
    console.log("down");
    setSelectFocused(true);
  };

  const InputWithFocus = React.forwardRef((props, ref) => {
    return (
      <input type="text" ref={ref as LegacyRef<HTMLInputElement>} {...props} />
    );
  });
  return (
    <div className="flex flex-col my-6 ">
      <label htmlFor={name} className="input-label">
        Phone number
      </label>
      <div
        className={`flex flex-row justify-center items-center border-[1px]  pl-8 rounded-md mt-3 bg-transparent ${
          selectFocused
            ? " outline-none border-[#1565D8] border-[1px] shadow-input"
            : "border-[#8692A6]"
        }`}
        onMouseDown={mouseDownHandler}
        onBlur={() => {
          console.log("blur");
          setSelectFocused(false);
        }}
      >
        <ReactCountryFlag
          className=""
          countryCode={country}
          style={{
            fontSize: "2em",
            lineHeight: "2em",
          }}
          svg
          onMouseDown={mouseDownHandler}
        />
        <CountrySelect labels={en} value={country} onChange={setCountry} />
        <Input
          country={country as CountryCode}
          value={value}
          onChange={() => setValue}
          international
          inputComponent={() => {
            return (
              <InputWithFocus
                type="text"
                className="h-16 w-full focus:outline-none bg-transparent "
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
