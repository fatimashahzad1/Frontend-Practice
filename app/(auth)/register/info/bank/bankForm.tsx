"use client";
import React, { useEffect } from "react";
import Input from "../../../../../components/auth/input";
import { MdLockOutline } from "react-icons/md";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankSchema } from "@/constants/schemas";
import { BANK_VERIFICATION_FIELD } from "@/constants/form-fields";
import { useRegistration } from "@/contexts/registration-context";
import useRegister from "@/hooks/use-register";
import Spinner from "@/components/icons/spinner";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

const BankForm = () => {
  const { formData } = useRegistration();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(BankSchema),
    defaultValues: formData,
  });
  const { register, loading, data: responseData, error } = useRegister();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (responseData) {
      toast({
        variant: "default",
        title: responseData.success,
        description: responseData.message,
      });
      router.push(ROUTES.login);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error.error,
        description: error.message,
      });
    }
  }, [responseData, toast, error]);

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
