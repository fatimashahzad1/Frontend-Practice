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
import { NotepadText, Upload, Trash2, ImageOff } from 'lucide-react';
import { useUploadImage } from '@/hooks/use-upload-image';
import { WriteArticleSchema } from '@/constants/schemas';
import { Form } from '@/components/ui/form';
import {
  CREATE_ARTICLE_DESCRIPTION_FIELD,
  CREATE_ARTICLE_ESTIMATION_FIELD,
  CREATE_ARTICLE_TITLE_FIELD,
  DEFAULT_CREATE_ARTICLE_VALUES,
  FORM_FIELD_NAMES,
} from '@/constants/form-fields';
import SettingsInput from '@/app/settings/settingsInput';
import Image from 'next/image';
import useCreateArticle from '@/hooks/use-create-article';
import { CustomTextarea } from '@/app/settings/custom-textarea';

const WriteArticleModal = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof WriteArticleSchema>>({
    resolver: zodResolver(WriteArticleSchema),
    defaultValues: DEFAULT_CREATE_ARTICLE_VALUES,
  });
  const { mutate: createArticle } = useCreateArticle();

  // Image Upload Hook
  const { image, uploading, progress, uploadImage, removeImage } =
    useUploadImage();

  // Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  // When the image is uploaded, set it in the form state
  React.useEffect(() => {
    if (image) {
      form.setValue(FORM_FIELD_NAMES.ARTICLE_IMAGE, image);
    }
  }, [image, form]);

  const onSubmit = (values: z.infer<typeof WriteArticleSchema>) => {
    console.log('Article Data:', values);
    createArticle({
      title: values.title,
      description: values.description,
      estimatedTime: values.estimatedTime,
      articleImage: values?.articleImage,
    });
    setOpen(false); // Close modal after submission
  };

  return (
    <>
      <Button
        className='text-[#1565D8] gap-[10px] p-0'
        type='button'
        onClick={() => setOpen(true)}
      >
        <NotepadText height={26} />
        <p className='text-[#1565D8] font-medium'>Write Article</p>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Article</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form id="write-article-form" onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(onSubmit)() }} className='space-y-5'>
              {/* Image Upload */}
              <div className='w-full flex flex-col items-center justify-center'>
                <label className='text-sm md:text-base font-semibold'>
                  Upload Image
                </label>
                <div className='relative w-40 h-40 mt-2 border rounded-lg flex items-center justify-center bg-gray-100'>
                  {image ? (
                    <Image
                      //   src={image}
                      src='https://res.cloudinary.com/dwwten9jp/image/upload/v1741684795/blob_ads6z6.jpg'
                      alt='Uploaded'
                      className='w-full h-full object-contain rounded-lg'
                      width={160}
                      height={0}
                    />
                  ) : (
                    <div className='flex flex-col items-center text-gray-500'>
                      <ImageOff size={32} />
                      <span className='text-xs'>No image uploaded yet</span>
                    </div>
                  )}
                  {image && (
                    <button
                      type='button'
                      className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full'
                      onClick={removeImage}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <label
                  htmlFor='upload-image'
                  className='mt-2 flex items-center gap-2 p-2 border rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 transition'
                >
                  <Upload size={18} />
                  <span>{image ? 'Change Image' : 'Choose an image'}</span>
                </label>
                <input
                  id='upload-image'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageUpload}
                />

                {uploading && (
                  <p className='text-xs text-gray-500 mt-1'>
                    Uploading: {progress}%
                  </p>
                )}
              </div>

              <SettingsInput
                control={form.control}
                {...CREATE_ARTICLE_TITLE_FIELD}
              />

              <CustomTextarea
                control={form.control}
                {...CREATE_ARTICLE_DESCRIPTION_FIELD}
              />

              <SettingsInput
                control={form.control}
                {...CREATE_ARTICLE_ESTIMATION_FIELD}
              />

              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setOpen(false)}
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

export default WriteArticleModal;
