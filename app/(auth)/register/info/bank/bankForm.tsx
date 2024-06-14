"use client";
import React from "react";
import Input from "../../../../../components/input";
import { MdLockOutline } from "react-icons/md";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const BankForm = () => {
  interface FormData {
    bankNo: string;
  }

  const BankSchema = z.object({
    bankNo: z.string().trim().min(3, "BVN must be at least 3 characters long"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(BankSchema),
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
        register={register("bankNo")}
        error={errors.bankNo}
        label="Bank verification number (BVN)"
        placeholder="Enter BVN"
        type="text"
        name="bvn"
      />

      <button
        type="submit"
        className="bg-[#1565D8] text-white text-center py-6 text-base font-medium w-full sm:mt-16 max-sm:mt-10 rounded-md"
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

export default BankForm;
