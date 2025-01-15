"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import Link from "next/link";
import { ResetPasswordSchema } from "@/constants/schemas";
import {
  CONFIRM_PASSWORD_FIELD,
  DEFAULT_RESET_PASSWORD_VALUES,
  PASSWORD_FIELD,
} from "@/constants/form-fields";

const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: DEFAULT_RESET_PASSWORD_VALUES,
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log("Submit", data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:min-w-[300px] md:min-w-[335px] lg:min-w-[426px] "
      >
        <Input {...PASSWORD_FIELD} />
        <Input {...CONFIRM_PASSWORD_FIELD} />

        <button
          type="submit"
          className="bg-[#1565D8] text-white text-center py-6 text-base font-medium w-full mt-6  rounded-md"
        >
          Request Reset Link
        </button>

        <Link
          href="/login"
          className="text-primaryBlue font-medium text-base block text-center my-10"
        >
          Back to Login
        </Link>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;
