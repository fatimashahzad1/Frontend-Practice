import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ONLINE_PRESENCE_PLATFORMS } from "@/constants";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddOnlinePresenceSchema } from "@/constants/schemas";
import {
  DEFAULT_ONLINE_PRESENCE_VALUES,
  FORM_FIELD_NAMES,
} from "@/constants/form-fields";
import useUser from "@/hooks/use-user";

const OnlinePresenceModal = () => {
  const [open, setOpen] = useState(false);
  const { getValues, setValue } = useFormContext();
  const { data: user } = useUser();

  const form = useForm({
    resolver: zodResolver(AddOnlinePresenceSchema),
    defaultValues: DEFAULT_ONLINE_PRESENCE_VALUES,
  });

  const onSubmit = (values: z.infer<typeof AddOnlinePresenceSchema>) => {
    const existingLinks = getValues("links") || [];
    setValue(
      "links",
      [
        ...existingLinks,
        { ...values, id: existingLinks.length + 1, userId: user?.id },
      ],
      {
        shouldDirty: true,
      },
    ); // Update parent form
    setOpen(false); // Close modal after submission
    form.reset(DEFAULT_ONLINE_PRESENCE_VALUES);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-[#201CCD] hover:text-[#201CCD]">
          <Plus color="#201CCD" className="mr-2" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Online Presence</DialogTitle>
          <DialogDescription>
            Select a platform and add the corresponding URL.
          </DialogDescription>
        </DialogHeader>

        {/* Form Wrapper */}
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(onSubmit)();
            }}
            className="grid gap-4 py-4"
          >
            {/* Platform Selection */}
            <FormField
              control={form.control}
              name={FORM_FIELD_NAMES.PLATFORM}
              render={({ field }) => (
                <FormItem className="">
                  <Label htmlFor="platform" className="text-right">
                    Platform
                  </Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-[58px]">
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ONLINE_PRESENCE_PLATFORMS.map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL Input */}
            <FormField
              control={form.control}
              name={FORM_FIELD_NAMES.URL}
              render={({ field }) => (
                <FormItem className="">
                  <Label htmlFor="url" className="text-right">
                    URL
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      id="url"
                      placeholder="Enter URL"
                      className="col-span-3 h-[58px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <DialogFooter>
              <Button
                type="submit"
                variant="outline"
                disabled={form.formState.isSubmitting}
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OnlinePresenceModal;
