'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CompanyRegisterSchema } from '@/constants/schemas';
import {
  COMPANY_NAME_FIELD,
  COMPANY_SIZE_FIELD,
  COMPANY_WEBSITE_FIELD,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  TERMS_AND_CONDITIONS_FIELD,
} from '@/constants/form-fields';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/contexts/registration-context';
import Input from '@/components/auth/input';
import { USER_TYPE } from '@/constants';

const CompanyRegisterFields: FormField[] = [
  COMPANY_NAME_FIELD,
  COMPANY_WEBSITE_FIELD,
  COMPANY_SIZE_FIELD,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  TERMS_AND_CONDITIONS_FIELD,
];

const CompanyForm = () => {
  const { companyFormData, setCompanyFormData } = useRegistration();
  const form = useForm<CompanyRegisterFormData>({
    resolver: zodResolver(CompanyRegisterSchema),
    defaultValues: companyFormData,
  });
  const router = useRouter();

  const onSubmit = (data: CompanyRegisterFormData) => {
    setCompanyFormData((prevData) => ({
      ...prevData,
      ...data,
      userType: USER_TYPE.COMPANY,
    }));
    router.push(ROUTES.registerResidential);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:min-w-[300px] md:min-w-[335px] lg:min-w-[426px]"
      >
        {CompanyRegisterFields.map((field) => (
          <Input key={field.name} {...field} />
        ))}

        <button
          type="submit"
          className="bg-[#1565D8] text-white text-center py-6 text-base font-medium w-full mt-10 rounded-md"
        >
          Next
        </button>
      </form>
    </FormProvider>
  );
};

export default CompanyForm;
