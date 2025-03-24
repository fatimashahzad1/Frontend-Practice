import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { notifications } from "@/mocks/dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

const NotificationPopover = () => {
  dayjs.extend(relativeTime);
  return (
    <Popover>
      <PopoverTrigger className="text-textGrey font-medium">
        Notifications
      </PopoverTrigger>
      <PopoverContent className="w-[600px] px-0 ">
        {notifications.map((item, index) => {
          return (
            <div
              key={`notification-${index}`}
              className={`flex flex-row gap-4 px-4 border-b last:border-b-0 py-3 ${
                item.new && "bg-[#EEF5FF]"
              }`}
            >
              <Avatar className="w-14 h-14">
                <AvatarImage
                  src={item.imageUrl}
                  alt="Avatar"
                  style={{ borderColor: "#5F9CF3" }}
                />
                <AvatarFallback>{item.title}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col justify-center w-full relative">
                <p className=" text-base">{item.title}</p>
                {item.new && (
                  <Image
                    src="/assets/dashboard/notification.svg"
                    alt="notification"
                    width={8}
                    height={8}
                    className="self-end absolute top-6 "
                  />
                )}
                <p className="text-xs text-[#646464]">
                  {dayjs(item.createdAt).fromNow()}
                </p>
              </div>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
