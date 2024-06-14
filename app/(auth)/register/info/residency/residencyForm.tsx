"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../input";
import PhoneNumberInput from "./phoneNumberInput";
import CountrySelect from "./countrySelect";
import { MdLockOutline } from "react-icons/md";

const ResidencySchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(11, "Phone Number must be at least 11 characters long"),
  address: z
    .string()
    .trim()
    .min(3, "Address must be at least 3 characters long"),
  country: z.string(),
});

const ResidencyForm = () => {
  interface FormData {
    phoneNumber: string;
    address: string;
    country: string;
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ResidencySchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Submit", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:min-w-[300px] md:min-w-[335px] lg:min-w-[426px]"
    >
      <Input
        register={register("address")}
        error={errors.address}
        label="Your address"
        placeholder="Please enter address"
        type="text"
        name="address"
      />
      <PhoneNumberInput
        register={register("phoneNumber")}
        error={errors.phoneNumber}
        name="phoneNumber"
      />

      <CountrySelect />

      <button
        type="submit"
        className="bg-[#1565D8] text-white text-center py-6 text-base font-medium w-full mt-10 rounded-md"
      >
        Save & Continue
      </button>
      <div className="text-xs text-[#8692A6] font-normal flex justify-center items-center mt-7">
        <MdLockOutline className="w-4 h-4" />
        Your Info is safely secured
      </div>
    </form>
  );
};

export default ResidencyForm;
