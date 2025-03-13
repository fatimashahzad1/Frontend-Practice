import { Card } from '@/components/ui/card';
import { getRelativeTime } from '@/lib/date';
import Image from 'next/image';
import FallbackImage from '../fallback-image';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { POST_TYPE, POST_TYPE_NAME } from "@/constants";

export function ArticleCard({ postDetails }: { readonly postDetails: Post }) {
  dayjs.extend(customParseFormat);
  return (
    <Card className='w-full p-4 shadow-md rounded-lg flex flex-col gap-4 mb-4'>
      <div className='flex items-center gap-3'>
        <Image
          src={'/assets/dashboard/creator-avatar.svg'}
          alt='Avatar'
          className='w-14 h-14'
          width={0}
          height={0}
        />
        <div>
          <h3 className='font-semibold'>{postDetails.author.name}</h3>
          <p className='text-sm text-gray-500'>
            {getRelativeTime(postDetails.createdAt)}
          </p>
        </div>
      </div>
      {postDetails?.type === (POST_TYPE_NAME.EVENT || POST_TYPE.EVENT) && <>
        <div className='max-md:text-[10px] text-gray-700 font-semibold'>{postDetails.title}</div>
        <div className='max-md:text-[10px] text-gray-700 font-semibold'>Timing: <span className="font-normal">{dayjs(postDetails?.eventDate).format("MMM D, YYYY")} at {dayjs(postDetails?.eventTime ?? "00:00", "HH:mm").format("hh:mm A")}</span></div>
      </>}
      <p className='max-md:text-[10px] text-gray-700'>{postDetails.content}</p>

      {postDetails?.postImage && (
        <FallbackImage
          src={postDetails?.postImage}
          fallbackSrc='/assets/dashboard/article.png' // Provide a local fallback image
          alt='Article'
          className='w-full h-[365px] object-cover rounded-md'
          width={668}
          height={365}
        />
      )}
    </Card>
  );
}
