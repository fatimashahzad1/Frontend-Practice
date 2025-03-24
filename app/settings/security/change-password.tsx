"use client";
import { Form } from "@/components/ui/form";
import {
  CONFIRM_PASSWORD_FIELD,
  DEFAULT_RESET_PASSWORD_VALUES,
  PASSWORD_FIELD,
} from "@/constants/form-fields";
import { ResetPasswordSchema } from "@/constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SettingsInput from "../settingsInput";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/get-token";
import useResetPassword from "@/hooks/use-reset-password";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ChangePassword = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: DEFAULT_RESET_PASSWORD_VALUES,
  });
  const { mutate: resetPassword, isPending } = useResetPassword();

  async function onSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    const token = await getToken();
    resetPassword({ data, token });
    form.reset();
    setOpen(false);
  }
  return (
    <div className="border-[#EFEFFF] md:border-b-2 md:pb-6">
      <h2 className="text-sm md:text-xl font-bold text-black mt-6 mb-3 md:mt-10 md:mb-8">
        Password
      </h2>
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-sm md:text-lg">
          Can’t remember your current password?{" "}
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-[#1565D8] hover:text-[#1565D8]"
            >
              Reset your password
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change Email Address</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5" style={{ marginTop: 0 }}>
                  <SettingsInput control={form.control} {...PASSWORD_FIELD} />
                  <SettingsInput
                    control={form.control}
                    {...CONFIRM_PASSWORD_FIELD}
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="mt-3 md:mt-8 max-w-fit bg-[#1565D8] h-12 text-sm md:text-base font-medium text-white rounded-[10px] md:mb-8"
                    type="submit"
                    disabled={isPending}
                  >
                    Save Password Changes
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ChangePassword;
