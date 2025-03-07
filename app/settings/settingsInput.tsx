import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
const SettingsInput = ({
    control,
    label,

    name,
    maxLength = 20,
    placeholder = '',
    type = 'text',
}: SettingsInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-2 w-max-[277px] md:mt-7">
                    <FormLabel className="text-sm md:text-base font-semibold ">
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            type={type}
                            maxLength={maxLength}
                            className="w-full ml-0 border-[1px] setting-input px-8 py-7"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SettingsInput;
