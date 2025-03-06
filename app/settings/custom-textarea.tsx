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
                    <FormLabel className="text-sm md:text-base font-semibold ">
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            maxLength={maxLength}
                            placeholder={placeholder}
                            {...field}
                            className="setting-input px-8 ml-0 py-7"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
