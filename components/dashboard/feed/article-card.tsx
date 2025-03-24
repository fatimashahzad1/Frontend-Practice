import { Card } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/date";
import FallbackImage from "../fallback-image";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { POST_TYPE, POST_TYPE_NAME } from "@/constants";
import DeleteModal from "@/app/settings/security/delete-modal";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDeletePost from "@/hooks/use-delete-post";

interface ArticleCardProps {
  readonly postDetails: Post;
  readonly preview: boolean;
  readonly userId?: number;
}

export function ArticleCard({
  postDetails,
  preview,
  userId,
}: ArticleCardProps) {
  dayjs.extend(customParseFormat);
  const { mutate: deletePost } = useDeletePost(
    postDetails?.type === POST_TYPE.EVENT ||
      postDetails?.type === POST_TYPE_NAME.EVENT
      ? POST_TYPE.EVENT
      : POST_TYPE.FEED,
  );
  return (
    <Card className="w-full p-4 shadow-md rounded-lg flex flex-col gap-4 mb-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <FallbackImage
            src={postDetails.author.pictureUrl}
            alt="Avatar"
            width={56}
            height={56}
            className="object-cover h-14 w-14"
            fallbackSrc="/assets/dashboard/defaultAvatar.jpg"
          />
          <div>
            <h3 className="font-semibold">{postDetails.author.name}</h3>
            <p className="text-sm text-gray-500">
              {getRelativeTime(postDetails.createdAt)}
            </p>
          </div>
        </div>
        {!preview && userId === postDetails.author.id && (
          <DeleteModal
            handleOnDelete={() => {
              deletePost(postDetails.id);
            }}
            trigger={
              <Button
                className="text-[#1565D8] gap-[10px] p-0 cursor-pointer"
                type="button"
              >
                <Trash2 size={20} />
              </Button>
            }
            title="Are you Sure?"
            description="You want to delete this post?"
          />
        )}
      </div>
      {(postDetails?.type === POST_TYPE.EVENT ||
        postDetails?.type === POST_TYPE_NAME.EVENT) && (
        <>
          <div className="max-md:text-[10px] text-gray-700 font-semibold">
            {postDetails.title}
          </div>
          <div className="max-md:text-[10px] text-gray-700 font-semibold">
            Timing:{" "}
            <span className="font-normal">
              {dayjs(postDetails?.eventDate).format("MMM D, YYYY")} at{" "}
              {dayjs(postDetails?.eventTime ?? "00:00", "HH:mm").format(
                "hh:mm A",
              )}
            </span>
          </div>
        </>
      )}
      <p className="max-md:text-[10px] text-gray-700">{postDetails.content}</p>

      {postDetails?.postImage && (
        <FallbackImage
          src={postDetails?.postImage}
          fallbackSrc="/assets/dashboard/article.png" // Provide a local fallback image
          alt="Article"
          className="w-full h-[365px] object-cover rounded-md"
          width={668}
          height={365}
        />
      )}
    </Card>
  );
}
