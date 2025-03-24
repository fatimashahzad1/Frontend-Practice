'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DASHBOARD_SIMILAR_PAGES } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { avatars, eventPlanners } from '@/mocks/dashboard';

import { Phone, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import SideCollectionItem from './side-collection-item';
import useUser from '@/hooks/use-user';
import FallbackImage from '../fallback-image';
import useGetAllUnFollowedUsers from '@/hooks/use-get-all-unfollowed-users';
import usePeople from '@/hooks/use-people';

const LeftContainer = ({ type }: { type: string }) => {
  const { data: user } = useUser();
  const { data: unFollowedUsers } = useGetAllUnFollowedUsers();
  const { followPerson } = usePeople();
  return (
    <div className="max-md:hidden col-span-3 pl-[30px] pt-[30px] flex flex-col gap-4">
      {/* profile image */}
      {type === DASHBOARD_SIMILAR_PAGES.FEED && (
        <div className="flex flex-col items-center justify-center space-x-4 bg-white h-[188px] rounded-2xl">
          <FallbackImage
            src={user?.pictureUrl}
            fallbackSrc="/assets/dashboard/defaultAvatar.jpg"
            alt="user profile"
            className="object-cover rounded-2xl"
            width={80}
            height={80}
          />

          <h1 className="text-lg font-semibold">{user?.name}</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      )}

      {/* Add friends section */}
      <div className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-lg font-bold">Add Friends</h1>
          <Link
            href={ROUTES.people}
            className="text-[#1565D8] text-sm font-medium underline"
          >
            See All
          </Link>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          {unFollowedUsers?.map((user) => (
            <div
              className="flex flex-col items-center justify-between mt-4 border-[#5F9CF3] border-[0.4px] px-4 pt-3 w-[70px] rounded-sm"
              key={user.id}
            >
              <FallbackImage
                src={user.pictureUrl}
                fallbackSrc="/assets/dashboard/defaultAvatar.jpg"
                alt="user to follow"
                className="object-cover rounded-full w-9 h-9"
                objectFit="contain"
                width={40}
                height={40}
              />
              <h1 className="w-full h-4 text-xs font-semibold overflow-hidden text-ellipsis">
                {user.name}
              </h1>

              <Button
                className="p-0 relative top-4 w-[22px] h-[22px] bg-[#1565D8] rounded-full flex items-center justify-center shadow-md"
                onClick={() => {
                  followPerson(user.id);
                }}
              >
                <Plus className="text-white" size={11} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Contributors */}
      <div className="bg-white py-5 px-4 rounded-2xl">
        <h1 className="text-lg font-bold">Contributors</h1>
        <div className="flex items-center w-[156px]">
          {avatars.slice(0, 4).map((src, index) => (
            <Avatar
              key={index}
              className="-ml-4 first:ml-0 border-none w-10 h-10"
            >
              <AvatarImage
                src={src}
                alt="Avatar"
                className="-ml-4 first:ml-0 border-2 rounded-full"
                style={{ borderColor: '#5F9CF3' }}
              />
              {/* <AvatarFallback>U</AvatarFallback> */}
            </Avatar>
          ))}
          {avatars.length > 4 && (
            <p className="-ml-4 first:ml-0 w-10 h-10 rounded-full bg-white border-2 border-[#5F9CF3] justify-center flex items-center">
              +{avatars.length - 4}
            </p>
          )}
        </div>
      </div>

      {/* Event Planner */}
      {type === DASHBOARD_SIMILAR_PAGES.EVENTS && (
        <div className="px-4 py-5 bg-white flex flex-col gap-5 rounded-2xl">
          <h1 className="text-lg font-bold">Event Planner</h1>
          {eventPlanners.map((planner, index) => (
            <SideCollectionItem
              key={`planner=${index}`}
              text1={planner.name}
              text2={planner.rating}
              imageUrl={planner.imageUrl}
              type={DASHBOARD_SIMILAR_PAGES.EVENTS}
              rating={planner.rating}
              Icon={<Phone color="#1565D8" />}
              iconHandle={() => {}}
            />
          ))}
          <Button
            variant="outline"
            className="bg-[#1565D8] h-12 text-base font-medium text-white rounded-[10px]"
          >
            View All
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeftContainer;
