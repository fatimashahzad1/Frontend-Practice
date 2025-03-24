'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  DEFAULT_EVENT_VALUES,
  FORM_FIELD_NAMES,
} from '@/constants/form-fields';
import { AddPostEventSchema } from '@/constants/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Image as ImageIcon, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUploadImage } from '@/hooks/use-upload-image';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { ArticleCard } from './article-card';
import { useEffect } from 'react';
import useCreatePost from '@/hooks/use-create-post';
import WriteArticleModal from './write-article-modal';
import EventModal from './event-modal';
import useUser from '@/hooks/use-user';

export function PostCard() {
  const { image, uploading, progress, uploadImage, removeImage } =
    useUploadImage();
  const { data: user } = useUser();

  const { mutate: createPost } = useCreatePost();

  const form = useForm<z.infer<typeof AddPostEventSchema>>({
    resolver: zodResolver(AddPostEventSchema),
    defaultValues: DEFAULT_EVENT_VALUES,
  });
  useEffect(() => {
    if (image) {
      form.setValue(FORM_FIELD_NAMES.POST_IMAGE, image);
    }
  }, [image, form]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };
  function onSubmit(values: z.infer<typeof AddPostEventSchema>) {
    createPost({
      ...values,
      postImage: values.postImage ?? null, // Ensure postImage is never undefined
      ...(values?.eventDate && {
        eventDate: new Date(Date.parse(values.eventDate)),
      }),
    });
    removeImage();
    form.reset(DEFAULT_EVENT_VALUES);
  }
  return (
    <Card className="w-full p-4 shadow-md rounded-lg flex flex-col gap-4 my-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          id="outer-form"
        >
          <div className="flex items-start justify-center gap-3">
            <Avatar className="w-14 h-14">
              <AvatarImage
                className="rounded-full min-w-14 min-h-14 object-cover"
                src={user?.pictureUrl ?? '/assets/dashboard/defaultAvatar.jpg'}
              />
              <AvatarFallback className="w-10 h-10 flex justify-center items-center rounded-full">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-full">
              <FormField
                control={form.control}
                name={FORM_FIELD_NAMES.CONTENT}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="what’s on your mind?"
                        className="border border-gray-300 rounded-full p-2 h-11 my-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row flex-wrap gap-5 md:gap-12 mt-6">
                {/* Media Button */}
                <label className="relative cursor-pointer">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <Button
                    className={cn(
                      'text-[#1565D8] gap-[10px] p-0 cursor-pointer',
                      uploading && 'opacity-50 cursor-not-allowed'
                    )}
                    type="button"
                  >
                    <ImageIcon height={26} />
                    <p className="text-[#1565D8] font-medium">Media</p>
                  </Button>
                </label>
                <EventModal />
                <WriteArticleModal />
              </div>
            </div>
          </div>
          {/* Preview */}
          <div className=" flex flex-col items-start justify-center">
            {image && (
              <div className="relative w-40 h-40 self-center">
                <Image
                  src={image}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-lg"
                  width={402}
                  height={0}
                />
                {uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Progress value={progress} className="w-3/4 bg-gray-200" />
                  </div>
                )}
                {!uploading && (
                  <button
                    onClick={removeImage}
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            )}
            {Boolean(image || form.watch(FORM_FIELD_NAMES.CONTENT)) && (
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full text-lg font-bold text-center text-wrap">
                  Preview
                </div>

                <ArticleCard
                  preview={true}
                  postDetails={{
                    content: form.watch(FORM_FIELD_NAMES.CONTENT),
                    title: form.watch(FORM_FIELD_NAMES.TITLE),
                    eventDate: form.watch(FORM_FIELD_NAMES.EVENT_DATE),
                    eventTime: form.watch(FORM_FIELD_NAMES.EVENT_TIME),
                    type: form.watch(FORM_FIELD_NAMES.TYPE),
                    author: {
                      id: user?.id ?? 0,
                      name: user?.name ?? '',
                      pictureUrl: user?.pictureUrl ?? '',
                    },
                    createdAt: new Date().toString(),
                    postImage: image,
                  }}
                  userId={user?.id}
                />
                <Button variant="outline" type="submit">
                  Post
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}
