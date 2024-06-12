"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input";

const RegisterSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long"),
  accept: z.literal(true, {
    invalid_type_error: "You must accept terms and conditions.",
  }),
});

const RegisterForm = () => {
  interface FormData {
    name: string;
    email: string;
    password: string;
    accept: boolean;
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
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
        register={register("name")}
        error={errors.name}
        label="Your fullname*"
        placeholder="Enter full name"
        type="text"
        name="name"
      />

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

      <Input
        register={register("accept")}
        error={errors.accept}
        label="I agree to terms & conditions"
        placeholder="Enter password"
        type="checkbox"
        name="accept"
      />

      <button
        type="submit"
        className="bg-[#1565D8] text-white text-center py-6 text-base font-medium w-full mt-10 rounded-md"
      >
        Register Account
      </button>
    </form>
  );
};

export default RegisterForm;
