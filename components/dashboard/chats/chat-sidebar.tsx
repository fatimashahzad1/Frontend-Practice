'use client';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { List, MessageCircle, Phone, Users } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
const ChatSidebar = ({ className = '' }: { className?: string }) => {
  const path = usePathname();
  return (
    <div
      className={`max-sm:w-full w-[80px] bg-[#D6E6FF] h-screen ${className} flex flex-col gap-6 pt-3 items-center max-sm:items-start max-smpl-7`}
    >
      <ChatSideBarNavItem
        active={path === ROUTES.chatsList}
        path={ROUTES.chatsList}
      >
        <List className="w-6 h-6 text-[#475467]" />
      </ChatSideBarNavItem>
      <ChatSideBarNavItem
        active={path === ROUTES.chatsCall}
        path={ROUTES.chatsCall}
      >
        <Phone className="w-6 h-6 text-[#475467]" />
      </ChatSideBarNavItem>
      <ChatSideBarNavItem active={path === ROUTES.chats} path={ROUTES.chats}>
        <MessageCircle className="w-6 h-6 text-[#475467]" />
      </ChatSideBarNavItem>
      <ChatSideBarNavItem
        active={path === ROUTES.chatsContacts}
        path={ROUTES.chatsContacts}
      >
        <Users className="w-6 h-6 text-[#475467]" />
      </ChatSideBarNavItem>
    </div>
  );
};

interface ChatSideBarNavItemProps {
  active?: boolean;
  children: ReactNode;
  path: string;
}

const ChatSideBarNavItem = ({
  active = false,
  children,
  path,
}: ChatSideBarNavItemProps) => {
  return (
    <Link
      href={path}
      className={
        active
          ? 'rounded-full bg-white w-9 h-9 flex justify-center items-center'
          : 'bg-transparent'
      }
    >
      {children}
    </Link>
  );
};

export default ChatSidebar;
