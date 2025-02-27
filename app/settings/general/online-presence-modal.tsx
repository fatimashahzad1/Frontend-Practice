import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ONLINE_PRESENCE_PLATFORMS } from '@/constants';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const OnlinePresenceModal = () => {
  const [onlinePresence, setOnlinePresence] = useState<OnlinePresence>({
    platform: '',
    url: '',
  });
  const [open, setOpen] = useState(false);

  const { getValues, setValue } = useFormContext();

  const addLink = (platform: string, url: string) => {
    const existingLinks = getValues('links') || []; // Get existing links
    console.log({ existingLinks });
    const updatedLinks = [...existingLinks, { platform, url }]; // Append new link
    console.log({ updatedLinks });
    setValue('links', updatedLinks);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-[#201CCD] hover:text-[#201CCD]'>
          <Plus color='#201CCD' className='mr-2' />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Online Presence</DialogTitle>
          <DialogDescription>
            Select a platform and add the corresponding URL.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Platform
            </Label>
            <Select
              onValueChange={(value) =>
                setOnlinePresence({ platform: value, url: '' })
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a platform' />
              </SelectTrigger>
              <SelectContent>
                {ONLINE_PRESENCE_PLATFORMS.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              URL
            </Label>
            <Input
              id='url'
              placeholder='Enter URL'
              value={onlinePresence.url}
              onChange={(e) => {
                setOnlinePresence((oldState) => ({
                  ...oldState,
                  url: e.target.value,
                }));
              }}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              if (onlinePresence.url && onlinePresence.platform) {
                addLink(onlinePresence.platform, onlinePresence.url);
                setOpen(false);
              }
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnlinePresenceModal;
