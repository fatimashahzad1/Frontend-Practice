import { Card } from '@/components/ui/card';
import Image from 'next/image';

export function ArticleCard({ postDetails }: { postDetails: Post }) {
  return (
    <Card className='w-full p-4 shadow-md rounded-lg flex flex-col gap-4 mb-4'>
      <div className='flex items-center gap-3'>
        <Image
          src={postDetails.creatorImgUrl}
          alt='Avatar'
          className='w-14 h-14'
          width={0}
          height={0}
        />
        <div>
          <h3 className='font-semibold'>{postDetails.creatorName}</h3>
          <p className='text-sm text-gray-500'>{postDetails.lastEdited}</p>
        </div>
      </div>
      <p className='max-md:text-[10px] text-gray-700 max-md:h-8 h-12 line-clamp-2'>
        {postDetails.postDescription}
      </p>
      <Image
        src={postDetails.postImgUrl}
        alt='Article'
        className='w-full object-cover rounded-md'
        width={668}
        height={365}
      />
    </Card>
  );
}
