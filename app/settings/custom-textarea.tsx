'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export function CustomTextarea({
  control,
  label,
  placeholder,
  name,
  maxLength = 500,
}: SettingsInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              maxLength={maxLength}
              placeholder={placeholder}
              {...field}
              className="setting-input px-8 py-7"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
