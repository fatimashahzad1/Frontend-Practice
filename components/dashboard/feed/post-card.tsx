import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Image as ImageIcon, CalendarMinus2, NotepadText } from 'lucide-react';

export function PostCard() {
  return (
    <Card className='w-full p-4 shadow-md rounded-lg flex flex-col gap-4 my-6'>
      <div className='flex items-start gap-3'>
        <Avatar className='w-14 h-14'>
          <AvatarImage
            className='rounded-full min-w-14 min-h-14'
            src='/assets/dashboard/avatar1.svg'
          />
          <AvatarFallback className=' w-10 h-10 flex justify-center items-center rounded-full'>
            CN
          </AvatarFallback>
        </Avatar>
        <div className='w-full'>
          <Input
            type='text'
            placeholder='what’s on your mind?'
            className='flex-1 border border-gray-300 rounded-full p-2 h-11 my-1'
          />
          <div className='flex flex-row flex-wrap gap-5 md:gap-12 mt-6'>
            <Button className='text-[#1565D8] gap-[10px] p-0'>
              <ImageIcon height={26} />
              <p className='text-[#1565D8] font-medium'>Media</p>
            </Button>
            <Button className='text-[#1565D8] gap-[10px] p-0'>
              <CalendarMinus2 height={26} />
              <p className='text-[#1565D8] font-medium'>Events</p>
            </Button>
            <Button className='text-[#1565D8] gap-[10px] p-0'>
              <NotepadText height={26} />
              <p className='text-[#1565D8] font-medium'>Write Article</p>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
