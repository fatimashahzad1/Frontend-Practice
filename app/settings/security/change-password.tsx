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
        <div className="border-[#EFEFFF] border-b-2 pb-6">
            <h2 className="text-xl font-bold text-black mt-10 mb-8">
                Password
            </h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div
                        className="flex flex-row gap-5"
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
                    <p className="text-base font-medium">
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
                        className="max-w-fit bg-[#1565D8] h-12 text-base font-medium text-white rounded-[10px] mb-8"
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
