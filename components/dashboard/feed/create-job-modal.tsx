'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Briefcase } from 'lucide-react';
import { Form } from '@/components/ui/form';
import SettingsInput from '@/app/settings/settingsInput';
import { CreateJobSchema } from '@/constants/schemas';
import {
  COMPANY_LOCATION_FIELD,
  DEFAULT_CREATE_JOB_VALUES,
  HOURLY_RATE_FIELD,
  ROLE_SIZE_FIELD,
} from '@/constants/form-fields';
import useCreateJob from '@/hooks/use-create-job';

const CreateJobModal = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof CreateJobSchema>>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: DEFAULT_CREATE_JOB_VALUES,
  });
  const { mutate: createJob } = useCreateJob();

  const onSubmit = (values: z.infer<typeof CreateJobSchema>) => {
    console.log('Job Data:', values);
    createJob(values);
    setOpen(false); // Close modal after submission
    form.reset();
  };

  return (
    <>
      <Button
        className="text-primary gap-[10px] p-0"
        variant="link"
        type="button"
        onClick={() => setOpen(true)}
      >
        <Briefcase height={26} />
        <p className="text-[#1565D8] font-medium">Create Job</p>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              id="create-job-form"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(onSubmit)();
              }}
              className="space-y-5"
            >
              <SettingsInput control={form.control} {...ROLE_SIZE_FIELD} />

              <SettingsInput
                control={form.control}
                {...COMPANY_LOCATION_FIELD}
              />

              <SettingsInput control={form.control} {...HOURLY_RATE_FIELD} />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#1565D8] text-white">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateJobModal;
