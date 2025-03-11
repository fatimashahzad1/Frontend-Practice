'use client';
import { Button } from '@/components/ui/button';
import { DASHBOARD_SIMILAR_PAGES } from '@/constants';
import { companies, contacts, events } from '@/mocks/dashboard';
import { MessageSquareText, NotebookPen } from 'lucide-react';
import React from 'react';
import SideCollectionItem from './side-collection-item';

const RightContainer = ({ type }: { type?: string }) => {
  return (
    <div className='max-md:hidden col-span-3 mt-[30px] mr-[30px] flex flex-col gap-4'>
      {/* Contacts */}
      <div className='px-4 py-5 bg-white flex flex-col gap-5 rounded-2xl'>
        <h1 className='text-lg font-bold'>Contacts</h1>
        {contacts.map((user, index) => (
          <SideCollectionItem
            key={`contact-${index}`}
            text1={user.name}
            text2={[user?.city, user?.country].filter((item) => item).join(',')}
            Icon={<MessageSquareText color='#1565D8' />}
            iconHandle={() => {}}
            imageUrl={user.imageUrl}
          />
        ))}
      </div>

      {/* Upcoming Events */}
      {type === DASHBOARD_SIMILAR_PAGES.EVENTS && (
        <div className='px-4 py-5 bg-white flex flex-col gap-5 rounded-2xl'>
          <h1 className='text-lg font-bold'>Upcoming Events</h1>
          {events.map((event, index) => (
            <SideCollectionItem
              key={`event-${index}`}
              text1={event.name}
              text2={event.date}
              imageUrl={event.imageUrl}
              Icon={<NotebookPen color='#1565D8' />}
              iconHandle={() => {}}
              avatarClasses='rounded-none'
            />
          ))}
          <Button
            variant='outline'
            className='bg-[#1565D8] h-12 text-base font-medium text-white rounded-[10px]'
          >
            View All
          </Button>
        </div>
      )}

      {/* Top Companies */}
      {type === DASHBOARD_SIMILAR_PAGES.JOBS && (
        <div className='px-4 py-5 bg-white flex flex-col gap-5 rounded-2xl'>
          <h1 className='text-lg font-bold'>Top Companies</h1>
          {companies.map((company, index) => (
            <SideCollectionItem
              key={`company-${index}`}
              text1={company.name}
              text2={[company?.city, company?.state]
                .filter((item) => item)
                .join(',')}
              imageUrl={company.imageUrl}
              Icon={<NotebookPen color='#1565D8' />}
              iconHandle={() => {}}
            />
          ))}
          <Button
            variant='outline'
            className='bg-[#1565D8] h-12 text-base font-medium text-white rounded-[10px]'
          >
            View All
          </Button>
        </div>
      )}
    </div>
  );
};

export default RightContainer;
