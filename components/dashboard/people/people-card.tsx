import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FallbackImage from '../fallback-image';

type PeopleCardProps = {
  readonly title: string;
  readonly description: string;
  readonly actionTitle: string;
  readonly action: () => void;
  readonly actionButtonClasses: string;
  readonly actionDisabled: boolean;
  readonly imageUrl?: string | null;
};

export function PeopleCard({
  title,
  description,
  action,
  actionTitle,
  actionButtonClasses,
  actionDisabled,
  imageUrl,
}: PeopleCardProps) {
  return (
    <Card className='flex flex-row sm:flex-col overflow-hidden w-full sm:w-[320px] h-[73px] sm:h-[384px] rounded-3xl self-center sm:mx-auto max-sm:justify-center max-sm:items-center max-sm:shadow-none max-sm:border-x-0 max-sm:border-t-0 max-sm:border-[#D9D9D9] max-sm:border-b-2 max-sm:rounded-none max-sm:mt-4 max-sm:px-5 max-sm:gap-3'>
      <CardContent className='p-0 max-sm:flex max-sm:flex-row max-sm:items-center max-sm:w-9/12 max-sm:gap-3'>
        <FallbackImage
          src={imageUrl}
          fallbackSrc='/assets/dashboard/articleImg.png'
          width={320}
          height={200}
          alt='user profile'
          className='rounded-t-3xl max-sm:hidden'
        />
        <Avatar className='sm:hidden'>
          <AvatarImage
            src='/assets/dashboard/articleImg.png'
            alt='user profile'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='sm:p-5 overflow-hidden'>
          <p className='text-black text-base overflow-hidden whitespace-nowrap text-ellipsis '>
            {title}
          </p>
          <p className='text-[#62618F] text-base overflow-hidden whitespace-nowrap text-ellipsis'>
            {description}
          </p>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col justify-between w-full max-sm:p-0 max-sm:w-3/12'>
        <Button
          variant='outline'
          className={`max-sm:w-[87px] max-sm:text-xs max-sm:h-[36px] w-full text-lg font-medium h-[52px] ${actionButtonClasses} `}
          onClick={action}
          disabled={actionDisabled}
        >
          {actionTitle}
        </Button>
      </CardFooter>
    </Card>
  );
}
