"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import {
  DEFAULT_CHANGE_EMAIL_VALUES,
  EMAIL_FIELD,
} from "@/constants/form-fields";
import { ChangeEmailFormSchema } from "@/constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SettingsInput from "../settingsInput";
import useChangeUserDetails from "@/hooks/use-change-user-details";
import useUser from "@/hooks/use-user";

const ChangeEmailModal = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof ChangeEmailFormSchema>>({
    resolver: zodResolver(ChangeEmailFormSchema),
    defaultValues: DEFAULT_CHANGE_EMAIL_VALUES,
  });
  const { data: user } = useUser();
  const { changeUserDetails } = useChangeUserDetails();

  useEffect(() => {
    form.setValue("email", user?.email ?? "");
  }, [user, form]);

  function onSubmit(values: z.infer<typeof ChangeEmailFormSchema>) {
    changeUserDetails({
      data: { ...values, id: user?.id },
      reauthenticate: true,
    });
    form.reset();
    setOpen(false);
  }
  return (
    <div className="border-[#EFEFFF] md:border-b-2 md:pb-6">
      <h2 className="text-sm md:text-xl font-bold text-black mt-6 mb-3 md:mt-14 md:mb-8">
        Email address
      </h2>
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-sm md:text-lg">
          Your email address is{" "}
          <span className="font-bold italic">{user?.email}</span>
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-[#1565D8] hover:text-[#1565D8]"
            >
              Change
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change Email Address</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <SettingsInput control={form.control} {...EMAIL_FIELD} />

                <DialogFooter>
                  <Button type="submit" variant="outline">
                    Change
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

export default ChangeEmailModal;
