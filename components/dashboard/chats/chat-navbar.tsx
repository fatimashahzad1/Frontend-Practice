"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";
import ChatSidebar from "./chat-sidebar";

const ChatNavbar = () => {
  const path = usePathname();
  const name = path.split("/")[path.split("/").length - 1];
  const getCapitalized = (word: string) => {
    return word.charAt(0).toUpperCase().concat(word.substring(1));
  };
  return (
    <div className=" sm:hidden h-16 shadow-navbar w-full px-4 py-3 flex flex-row justify-between items-center">
      <Sheet>
        <SheetTrigger>
          <FiMenu className="w-10 h-10 p-2" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[260px] bg-[#F5F9FF] h-screen p-0 m-0"
        >
          <ChatSidebar />
        </SheetContent>
      </Sheet>

      <div className="text-[#212121] text-lg font-normal">
        {getCapitalized(name)}
      </div>
      <Avatar className="w-10 h-10 p-[0.5px">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ChatNavbar;
