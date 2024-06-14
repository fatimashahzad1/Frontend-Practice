"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import Link from "next/link";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long"),
});

const ForgotPasswordForm = () => {
  interface FormData {
    email: string;
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Submit", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:min-w-[300px] md:min-w-[335px] lg:min-w-[426px] "
    >
      <Input
        register={register("email")}
        error={errors.email}
        label="Email"
        placeholder="Enter email"
        type="email"
        name="email"
      />

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
  );
};

export default ForgotPasswordForm;
