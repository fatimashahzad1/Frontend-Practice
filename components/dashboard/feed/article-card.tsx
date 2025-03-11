import { Card } from '@/components/ui/card';
import { getRelativeTime } from '@/lib/date';
import Image from 'next/image';

export function ArticleCard({ postDetails }: { readonly postDetails: Post }) {
  return (
    <Card className="w-full p-4 shadow-md rounded-lg flex flex-col gap-4 mb-4">
      <div className="flex items-center gap-3">
        <Image
          src={'/assets/dashboard/creator-avatar.svg'}
          alt="Avatar"
          className="w-14 h-14"
          width={0}
          height={0}
        />
        <div>
          <h3 className="font-semibold">{postDetails.author.name}</h3>
          <p className="text-sm text-gray-500">
            {getRelativeTime(postDetails.createdAt)}
          </p>
        </div>
      </div>
      <p className="max-md:text-[10px] text-gray-700 ">{postDetails.content}</p>
      {postDetails?.postImage && (
        <Image
          src={postDetails?.postImage}
          alt="Article"
          className="w-full h-[365px] object-cover rounded-md"
          width={668}
          height={365}
        />
      )}
    </Card>
  );
}
