import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const ProfilePicture = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDelete = () => {
    setImage(null);
  };

  return (
    <div className='flex items-center gap-5 mt-14'>
      {/* Image Preview */}
      <div className='w-[150px] h-[150px] rounded-[30px] overflow-hidden border'>
        {image ? (
          <Image
            src={image}
            alt='Profile'
            width={150}
            height={150}
            className='object-cover w-full h-full '
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-500 text-sm'>
            No Image
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className='flex flex-col gap-2'>
        <input
          ref={fileInputRef}
          type='file'
          className='hidden'
          accept='image/*'
          onChange={handleImageChange}
        />
        <Button
          variant='outline'
          type='button'
          className='h-[49px] w-[178px] bg-[#1565D8] text-white'
          onClick={() => fileInputRef.current?.click()}
        >
          Change Picture
        </Button>
        <Button
          className='h-[49px] w-[178px]'
          variant='outline'
          type='button'
          onClick={handleDelete}
        >
          Delete Picture
        </Button>
      </div>
    </div>
  );
};

export default ProfilePicture;
