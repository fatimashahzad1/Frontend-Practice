'use client';

import React, { useState } from 'react';
import { useFormContext, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CalendarIcon, CalendarMinus2 } from 'lucide-react';
import {
  CREATE_ARTICLE_TITLE_FIELD,
  FORM_FIELD_NAMES,
} from '@/constants/form-fields';
import SettingsInput from '@/app/settings/settingsInput';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { AddEventSchema } from '@/constants/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { POST_TYPE } from '@/constants';

const EventModal = () => {
  const [open, setOpen] = useState(false);
  const { setValue } = useFormContext();

  const form = useForm<z.infer<typeof AddEventSchema>>({
    resolver: zodResolver(AddEventSchema),
    defaultValues: {
      title: '',
      eventDate: '',
      eventTime: '',
    },
  });

  function onSubmit(values: z.infer<typeof AddEventSchema>) {
    setValue(FORM_FIELD_NAMES.TITLE, form.getValues(FORM_FIELD_NAMES.TITLE));
    setValue(
      FORM_FIELD_NAMES.EVENT_DATE,
      form.getValues(FORM_FIELD_NAMES.EVENT_DATE)
    );
    setValue(
      FORM_FIELD_NAMES.EVENT_TIME,
      form.getValues(FORM_FIELD_NAMES.EVENT_TIME)
    );
    setValue(FORM_FIELD_NAMES.TYPE, POST_TYPE.EVENT);
    setOpen(false);
  }
  return (
    <>
      <Button
        className='text-[#1565D8] gap-[10px] p-0'
        type='button'
        onClick={() => setOpen(true)}
      >
        <CalendarMinus2 height={26} />
        <p className='text-[#1565D8] font-medium'>Events</p>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(onSubmit)();
              }}
              className='space-y-5'
            >
              <SettingsInput
                control={form.control}
                {...CREATE_ARTICLE_TITLE_FIELD}
              />

              {/* Date Picker Field */}
              <FormField
                control={form.control}
                name={FORM_FIELD_NAMES.EVENT_DATE}
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Event Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full h-[58px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'MMM d, yyyy') // ✅ Ensures "Jul 24, 2024" format
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <DayPicker
                          mode='single'
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, 'MMM d, yyyy') : null
                            )
                          } // ✅ Saves in "Jul 24, 2024" format
                          fromYear={2000}
                          toYear={2050}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time Picker Field */}
              <FormField
                control={form.control}
                name={FORM_FIELD_NAMES.EVENT_TIME}
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Event Time</FormLabel>
                    <FormControl>
                      <input
                        type='time'
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        className='w-full h-[58px] p-2 border rounded-md'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit' className='bg-[#1565D8] text-white'>
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

export default EventModal;
