"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SettingsInput from "../settingsInput";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  profession: z.string().min(2, {
    message: "Profession must be at least 2 characters.",
  }),
});
const GeneralForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      location: "",
      profession: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row gap-5">
          <SettingsInput
            control={form.control}
            label="First name"
            placeholder=""
            name="firstName"
          />
          <SettingsInput
            control={form.control}
            label="Last name"
            placeholder=""
            name="lastName"
          />
        </div>
        <SettingsInput
          control={form.control}
          label="Location"
          placeholder=""
          name="location"
        />
        <SettingsInput
          control={form.control}
          label="Profession"
          placeholder=""
          name="profession"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default GeneralForm;
