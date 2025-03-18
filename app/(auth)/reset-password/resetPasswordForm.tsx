'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/auth/input';
import Link from 'next/link';
import { ResetPasswordSchema } from '@/constants/schemas';
import {
  CONFIRM_PASSWORD_FIELD,
  DEFAULT_RESET_PASSWORD_VALUES,
  PASSWORD_FIELD,
} from '@/constants/form-fields';
import useResetPassword from '@/hooks/use-reset-password';
import Spinner from '@/components/icons/spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: DEFAULT_RESET_PASSWORD_VALUES,
  });

  const { mutate: resetPassword, isPending } = useResetPassword();
  const token = useSearchParams().get('token');
  const router = useRouter();

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword({ data, token });
    router.push(ROUTES.login);
  };

  return (
    <>
      {isPending && <Spinner />}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='sm:min-w-[300px] md:min-w-[335px] lg:min-w-[426px] '
        >
          <Input {...PASSWORD_FIELD} />
          <Input {...CONFIRM_PASSWORD_FIELD} />

          <button
            type='submit'
            className='bg-[#1565D8] text-white text-center py-6 text-base font-medium w-full mt-6  rounded-md'
          >
            Request Password
          </button>

          <Link
            href='/login'
            className='text-primaryBlue font-medium text-base block text-center my-10'
          >
            Back to Login
          </Link>
        </form>
      </FormProvider>
    </>
  );
};

export default ResetPasswordForm;
