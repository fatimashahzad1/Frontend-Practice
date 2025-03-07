import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const CustomSwitch = ({ name, label, description }: SettingsSwitchProp) => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 justify-between my-10 max-md:my-5">
                    <FormLabel className="text-black max-md:text-sm text-lg font-semibold ">
                        {label}{' '}
                        <div className="font-normal mt-5">{description}</div>
                    </FormLabel>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-primary data-[state=checked]:bg-[#1565D8]   before:bg-red-700"
                        ></Switch>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default CustomSwitch;
