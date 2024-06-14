import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface SettingsInputProps {
  control: any;
  label: string;
  placeholder: string;
  name: string;
}
const SettingsInput = ({
  control,
  label,
  placeholder,
  name,
}: SettingsInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2 w-max-[277px] mt-7">
          <FormLabel className="text-base font-semibold ">{label}</FormLabel>
          <FormControl className="">
            <Input
              placeholder={placeholder}
              {...field}
              className="ml-1 border-[1px] border-[#C3C3E4] rounded-[10px] px-8 py-7 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SettingsInput;
