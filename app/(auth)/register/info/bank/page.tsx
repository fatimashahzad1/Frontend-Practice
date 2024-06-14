"use client";
import LeftPanel from "@/components/leftPanel";
import React from "react";
import RegisterTemplate from "../../registerTemplate";
import Input from "../../../../../components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdLockOutline } from "react-icons/md";
import BankForm from "./bankForm";

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
        backToLink="/register/info/residency"
      >
        <BankForm />
      </RegisterTemplate>
    </div>
  );
};

export default Bank;
