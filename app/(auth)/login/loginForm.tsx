"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import Link from "next/link";

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long"),
});

const LoginForm = () => {
  interface FormData {
    email: string;
    password: string;
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
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
        label="Email address*"
        placeholder="Enter email address"
        type="email"
        name="email"
      />

      <Input
        register={register("password")}
        error={errors.password}
        label="Create password*"
        placeholder="Enter password"
        type="password"
        name="password"
      />

      <Link
        href="/login"
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
  );
};

export default LoginForm;
