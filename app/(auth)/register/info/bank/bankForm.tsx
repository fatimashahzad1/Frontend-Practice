"use client";
import React, { useEffect } from "react";
import Input from "../../../../../components/input";
import { MdLockOutline } from "react-icons/md";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankSchema } from "@/constants/schemas";
import { BANK_VERIFICATION_FIELD } from "@/constants/form-fields";
import { useRegistration } from "@/contexts/registration-context";
import useRegister from "@/hooks/use-register";
import Spinner from "@/components/spinner";
import { useToast } from "@/hooks/use-toast";

const BankForm = () => {
  const { formData } = useRegistration();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(BankSchema),
    defaultValues: formData,
  });
  const { register, loading, data: responseData } = useRegister();
  const { toast } = useToast();

  useEffect(() => {
    if (responseData) {
      const isErrorResponse = "error" in responseData; // Type narrowing

      toast({
        variant: isErrorResponse ? "destructive" : "default",
        title: isErrorResponse ? "Error" : "Success",
        description: isErrorResponse
          ? "Failed to Register"
          : "Successfully Registered",
      });
    }
  }, [responseData, toast]);

  const onSubmit = (data: BankFormData) => {
    register({ ...formData, ...data });
  };

  return (
    <>
      {loading && <Spinner />}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:min-w-[300px] md:min-w-[335px] lg:min-w-[426px]"
        >
          <Input {...BANK_VERIFICATION_FIELD} />

          <button
            type="submit"
            className="bg-[#1565D8] text-white text-center py-6 text-base font-medium w-full sm:mt-16 max-sm:mt-10 rounded-md"
          >
            Register
          </button>
          <div className="text-xs text-[#8692A6] font-normal flex justify-center items-center mt-7">
            <MdLockOutline className="w-4 h-4" />
            Your Info is safely secured
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default BankForm;
