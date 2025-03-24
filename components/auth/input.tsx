import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface InputProps {
  label: string;
  placeholder?: string;
  type?: string;
  name: string;
  maxLength?: number;
}

const Input = ({
  label,
  placeholder,
  type,
  name,
  maxLength = 20,
}: InputProps) => {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { control } = useFormContext();
  const {
    fieldState: { error },
    field: { onChange, value },
  } = useController({ name, control });

  if (type === 'checkbox') {
    return (
      <div className="flex flex-col">
        <div className="w-full flex flex-row items-center">
          <input
            type="checkbox"
            className="w-5 h-5 mr-4"
            checked={value}
            onChange={() => {
              onChange(!value);
            }}
            name={name}
          />
          <label
            htmlFor={name}
            className={` text-base font-medium w-full ${
              error?.message ? 'text-red-600' : 'text-[#696F79]'
            }`}
          >
            {label}
          </label>
        </div>
      </div>
    );
  }

  if (type === 'password') {
    return (
      <div className="flex flex-col my-6 ">
        <label htmlFor={name} className="input-label">
          {label}
        </label>
        <div
          className={`flex flex-row justify-between border-[1px] border-[#8692A6] rounded-md mt-3 bg-transparent ${
            passwordFocused &&
            'border-primary outline-none border-[1px] shadow-input'
          }`}
          onMouseDown={() => {
            setPasswordFocused(true);
          }}
          onBlur={() => {
            setPasswordFocused(false);
          }}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            className="border-none outline-none w-full h-full py-6 pl-8 rounded-md"
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            value={value}
          />
          <button
            type="button"
            className="pr-8 text-xs font-normal bg-white rounded-md text-primary"
            onClick={() => setShowPassword((old) => !old)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {error && <span className="text-red-600">{error.message}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col my-6 ">
      <label htmlFor={name} className="input-label">
        {label}
      </label>

      <input
        type={type}
        className="border-[1px] border-[#8692A6] py-6 px-8 rounded-md mt-3 bg-transparent focus:border-primary focus:outline-none focus:border-[1px] focus:shadow-input"
        placeholder={placeholder}
        onChange={(e) => {
          if (type === 'number') {
            onChange(
              e.target.value === '' ? undefined : parseFloat(e.target.value)
            );
            return;
          }
          onChange(e.target.value);
        }}
        value={type === 'number' && value === undefined ? '' : (value ?? '')} // Show empty string for undefined
        name={name}
        maxLength={maxLength}
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
};

export default Input;
