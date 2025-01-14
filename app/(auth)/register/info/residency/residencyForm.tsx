"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../../../components/input";
import PhoneNumberInput from "./phoneNumberInput";
import CountrySelect from "./countrySelect";
import { MdLockOutline } from "react-icons/md";
import { useRegistration } from "@/contexts/registration-context";
import { ResidencySchema } from "@/constants/schemas";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import {
  ADDRESS_VERIFICATION_FIELD,
  FORM_FIELD_NAMES,
} from "@/constants/form-fields";

const ResidencyForm = () => {
  const { formData, setFormData } = useRegistration();

  const form = useForm<ResidencyFormData>({
    resolver: zodResolver(ResidencySchema),
    defaultValues: formData,
  });

  const router = useRouter();

  const onSubmit = (data: ResidencyFormData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    router.push(ROUTES.registerBank);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:min-w-[300px] md:min-w-[335px] lg:min-w-[426px]"
      >
        <Input {...ADDRESS_VERIFICATION_FIELD} />
        <PhoneNumberInput name={FORM_FIELD_NAMES.PHONE_NUMBER} />
        <CountrySelect name={FORM_FIELD_NAMES.COUNTRY} />

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
    </FormProvider>
  );
};

export default ResidencyForm;
