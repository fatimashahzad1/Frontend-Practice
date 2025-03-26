import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DASHBOARD_SIMILAR_PAGES } from '@/constants';
import { AvatarFallback } from '@radix-ui/react-avatar';
import React, { ReactNode } from 'react';
import ReactStars from 'react-rating-stars-component';

const SideCollectionItem = ({
  imageUrl,
  text1,
  text2,
  Icon,
  iconHandle,
  type,
  rating,
  avatarClasses,
}: {
  imageUrl: string;
  text1: string;
  text2: string | number;
  Icon: ReactNode;
  iconHandle: () => void;
  type?: string;
  rating?: number;
  avatarClasses?: string;
}) => {
  return (
    <div className="w-full flex flex-row justify-between items-center gap-4">
      <div className="flex-1 flex flex-row gap-4">
        <Avatar
          className={`w-14 h-14 bg-gray-300  justify-center items-center ${avatarClasses}`}
        >
          <AvatarImage
            src={imageUrl}
            alt="Avatar"
            style={{ borderColor: '#5F9CF3' }}
          />
          <AvatarFallback className="w-full text-center">
            {text1?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="w-full min-w=[49px] overflow-hidden">
          <p className="font-medium text-base  overflow-hidden text-ellipsis">
            {text1}
          </p>
          <div className="flex flex-row justify-start items-center gap-1 w-auto">
            <p className="text-xs font-normal overflow-hidden text-ellipsis">
              {text2}
            </p>
            {type === DASHBOARD_SIMILAR_PAGES.EVENTS && (
              <ReactStars
                count={5} // Total stars
                value={rating} // Your given rating
                size={12} // Star size
                edit={false} // Read-only mode
                activeColor="#ffd700" // Gold color for stars
                isHalf={true} // Enable half-stars
              />
            )}
          </div>
        </div>
      </div>
      <Button variant="link" size="icon" onClick={iconHandle}>
        {Icon}
      </Button>
    </div>
  );
};

export default SideCollectionItem;
