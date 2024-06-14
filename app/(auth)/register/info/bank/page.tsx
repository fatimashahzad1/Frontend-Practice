"use client";
import LeftPanel from "@/components/leftPanel";
import React from "react";
import RegisterTemplate from "../../registerTemplate";
import Input from "../../input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdLockOutline } from "react-icons/md";

const Bank = () => {
  const BankSchema = z.object({
    bvn: z.string().trim().min(3, "BVN must be at least 3 characters long"),
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
    <div className="flex flex-row">
      <LeftPanel />
      <RegisterTemplate
        heading="Complete Your Profile!"
        text="For the purpose of industry regulation, your details are required."
        stepNumber="03"
        stepName="Bank Verification"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sm:min-w-[300px] md:min-w-[335px] lg:min-w-[426px]"
        >
          <Input
            register={register("bvn")}
            error={errors.bvn}
            label="Bank verification number (BVN)"
            placeholder="Enter BVN"
            type="text"
            name="bvn"
          />

          <button
            type="submit"
            className="bg-[#1565D8] text-white text-center py-6 text-base font-medium w-full mt-16 rounded-md"
          >
            Save & Continue
          </button>
          <div className="text-xs text-[#8692A6] font-normal flex justify-center items-center mt-7">
            <MdLockOutline className="w-4 h-4" />
            Your Info is safely secured
          </div>
        </form>
      </RegisterTemplate>
    </div>
  );
};

export default Bank;
