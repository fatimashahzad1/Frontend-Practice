"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/auth/input";
import Link from "next/link";
import { ForgotPasswordSchema } from "@/constants/schemas";
import {
  DEFAULT_FORGET_PASSWORD_VALUES,
  EMAIL_FIELD,
} from "@/constants/form-fields";
import useForgotPassword from "@/hooks/use-forgot-password";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/components/icons/spinner";

const ForgotPasswordForm = () => {
  const form = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: DEFAULT_FORGET_PASSWORD_VALUES,
  });
  const { toast } = useToast();
  const { forgotPassword, data, error, loading } = useForgotPassword();

  useEffect(() => {
    if (data !== null || error !== null) {
      toast({
        variant: error ? "destructive" : "default",
        title: error ? error.error : data?.success,
        description: error ? error.message : data?.message,
      });
    }
  }, [data, toast, error]);

  const onSubmit = (data: ForgetPasswordFormData) => {
    forgotPassword(data);
  };

  return (
    <>
      {loading && <Spinner />}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:min-w-[300px]"
        >
          <Input {...EMAIL_FIELD} />

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
    </>
  );
};

export default ForgotPasswordForm;
