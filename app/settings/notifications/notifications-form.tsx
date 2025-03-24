"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { WEBSITE_NOTIFICATIONS_CHECKBOX_ITEMS } from "@/constants/settings";
import CustomSwitch from "./custom-switch";
import {
  ACCOUNT_SUMMARY_SWITCH_FIELD,
  DEFAULT_NOTIFICATIONS_VALUES,
  FORM_FIELD_NAMES,
  WEEKLY_NEWSLETTTER_SWITCH_FIELD,
} from "@/constants/form-fields";
import { NotificationsSchema } from "@/constants/schemas";

export default function NotificationsForm() {
  const form = useForm<z.infer<typeof NotificationsSchema>>({
    resolver: zodResolver(NotificationsSchema),
    defaultValues: DEFAULT_NOTIFICATIONS_VALUES,
  });

  function onSubmit(values: z.infer<typeof NotificationsSchema>) {
    console.log("Form Submitted:", values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-md:w-full w-[596px]"
      >
        <div className="text-base md:text-xl font-bold text-black mt-6 md:mt-14">
          Email Notifications
        </div>
        {/* Switch */}
        <CustomSwitch {...WEEKLY_NEWSLETTTER_SWITCH_FIELD} />
        <CustomSwitch {...ACCOUNT_SUMMARY_SWITCH_FIELD} />

        {/* Checkbox Group */}
        <div className="text-base md:text-xl font-bold text-black mt-6 md:mt-14 mb-4 md:mb-5">
          Website Notifications
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name={FORM_FIELD_NAMES.WEBSITE_NOTIFICATIONS_CHECKS}
            render={({ field }) => (
              <div className="space-y-3">
                {WEBSITE_NOTIFICATIONS_CHECKBOX_ITEMS.map((option) => (
                  <FormItem
                    key={option}
                    className="flex flex-row items-center gap-3"
                  >
                    <FormControl>
                      <Checkbox
                        className="w-7 h-7 border-gray-300 rounded-md text-primary-500 focus:ring-primary-500 data-[state=unchecked]:border-[#A4A4CB] data-[state=checked]:border-none data-[state=checked]:bg-[#1565D8]"
                        checked={field.value.includes(option)}
                        onCheckedChange={(checked) => {
                          field.onChange(
                            checked
                              ? [...field.value, option]
                              : field.value.filter((item) => item !== option),
                          );
                        }}
                      />
                    </FormControl>
                    <FormLabel
                      className="mt-10 text-base font-medium"
                      style={{ marginTop: 0 }}
                    >
                      {option}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
            )}
          />
          <FormMessage>
            {form.formState.errors.websiteNotifications?.message}
          </FormMessage>
        </div>

        {/* Submit Button */}
        <div className="w-full flex flex-row md:gap-8 gap-5 md:mt-11 mt-10">
          <Button
            type="submit"
            variant="default"
            className="flex-1 md:max-w-[167px] max-w-[137px] font-medium md:text-base text-xs bg-[#1565D8]"
          >
            Save Changes
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="flex-1 md:max-w-[167px] max-w-[137px] font-medium md:text-base text-xs"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
