"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import Link from "next/link";
import { LoginSchema } from "@/constants/schemas";
import {
  DEFAULT_LOGIN_VALUES,
  EMAIL_FIELD,
  PASSWORD_FIELD,
} from "@/constants/form-fields";
import { useToast } from "@/hooks/use-toast";
import useLogin from "@/hooks/use-login";
import Spinner from "@/components/spinner";

const LoginFields = [EMAIL_FIELD, PASSWORD_FIELD];

const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: DEFAULT_LOGIN_VALUES,
  });

  const { login, loading, data: responseData } = useLogin();
  const { toast } = useToast();

  useEffect(() => {
    if (responseData) {
      const isErrorResponse = "error" in responseData; // Type narrowing

      toast({
        variant: isErrorResponse ? "destructive" : "default",
        title: isErrorResponse ? responseData.error : "Success",
        description: isErrorResponse
          ? responseData.message
          : "Login Successful.",
      });
    }
  }, [responseData, toast]);

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <>
      {loading && <Spinner />}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:min-w-[300px] "
        >
          {LoginFields.map((field) => (
            <Input key={field.name} {...field} />
          ))}

          <Link
            href="/forgot-password"
            className="text-primaryBlue font-medium text-base block text-right"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            className="bg-[#1565D8] text-white text-center py-6 text-base font-medium w-full mt-6  rounded-md"
          >
            Login
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
