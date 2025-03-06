'use client';
import { Form } from '@/components/ui/form';
import {
    CONFIRM_PASSWORD_FIELD,
    DEFAULT_RESET_PASSWORD_VALUES,
    PASSWORD_FIELD,
} from '@/constants/form-fields';
import { ResetPasswordSchema } from '@/constants/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SettingsInput from '../settingsInput';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const ChangePassword = () => {
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: DEFAULT_RESET_PASSWORD_VALUES,
    });
    function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
        console.log(values);
    }
    return (
        <div className="border-[#EFEFFF] md:border-b-2 md:pb-6">
            <h2 className="text-sm md:text-xl font-bold text-black mt-6 mb-3 md:mt-10 md:mb-8">
                Password
            </h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div
                        className="flex flex-col md:flex-row gap-5"
                        style={{ marginTop: 0 }}
                    >
                        <SettingsInput
                            control={form.control}
                            {...PASSWORD_FIELD}
                        />
                        <SettingsInput
                            control={form.control}
                            {...CONFIRM_PASSWORD_FIELD}
                        />
                    </div>
                    <p className="mt-4 md:mt-7 text-sm md:text-base font-medium">
                        Can’t remember your current password?{' '}
                        <Link
                            href={ROUTES.resetPassword}
                            className="text-[#1565D8]"
                        >
                            Reset your password
                        </Link>
                    </p>
                    <Button
                        variant="outline"
                        className="mt-3 md:mt-8 max-w-fit bg-[#1565D8] h-12 text-sm md:text-base font-medium text-white rounded-[10px] md:mb-8"
                        type="submit"
                    >
                        Save Password Changes
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ChangePassword;
