"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/input";
import { RegisterSchema } from "@/constants/schemas";
import {
  EMAIL_FIELD,
  FULLNAME_FIELD,
  PASSWORD_FIELD,
  TERMS_AND_CONDITIONS_FIELD,
} from "@/constants/form-fields";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useRegistration } from "@/contexts/registration-context";

const RegisterFields: FormField[] = [
  FULLNAME_FIELD,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  TERMS_AND_CONDITIONS_FIELD,
];

const RegisterForm = () => {
  const { formData, setFormData } = useRegistration();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: formData,
  });
  const router = useRouter();

  const onSubmit = (data: PersonalFormData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    router.push(ROUTES.registerResidential);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:min-w-[300px] md:min-w-[335px] lg:min-w-[426px]"
      >
        {RegisterFields.map((field) => (
          <Input key={field.name} {...field} />
        ))}

        <button
          type="submit"
          className="bg-[#1565D8] text-white text-center py-6 text-base font-medium w-full mt-10 rounded-md"
        >
          Next
        </button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
