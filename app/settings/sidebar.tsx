"use client";
import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbBoxModel2, TbBoxPadding, TbSquares } from "react-icons/tb";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { MdLockOutline } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Sidebar = ({ className = "" }: { className?: string }) => {
  const path = usePathname();
  return (
    <div className={`w-[260px] bg-[#F5F9FF] h-screen ${className}`}>
      <div className="flex flex-row ml-10 mt-14 mb-12 gap-3">
        <Avatar className="w-14 h-14 rounded-[17px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="my-2">
          <div className="text-[#1A194D] font-bold text-base">
            Ildiko Gaspar
          </div>
          <div className="text-#62618F text-sm font-normal">@igaspar</div>
        </div>
      </div>
      <SideBarNavItem
        label="General"
        active={path === "/settings/general"}
        path="/settings/general"
      >
        <TbBoxModel2 className="w-8 h-8" />
      </SideBarNavItem>
      <SideBarNavItem
        label="Security"
        active={path === "/settings/security"}
        path="/settings/security"
      >
        <MdLockOutline className="w-8 h-8" />
      </SideBarNavItem>
      <SideBarNavItem
        label="Notifications"
        active={path === "/settings/notifications"}
        path="/settings/notifications"
      >
        <HiOutlineEnvelope className="w-8 h-8" />
      </SideBarNavItem>
      <SideBarNavItem
        label="Billing"
        active={path === "/settings/billing"}
        path="/settings/billing"
      >
        <TbSquares className="w-8 h-8" />
      </SideBarNavItem>
      <SideBarNavItem
        label="Analytics"
        active={path === "/settings/analytics"}
        path="/settings/analytics"
      >
        <TbBoxPadding className="w-8 h-8" />
      </SideBarNavItem>
    </div>
  );
};

interface SideBarNavItemProps {
  active?: boolean;
  label: string;
  children: ReactNode;
  path: string;
}

const SideBarNavItem = ({
  active = false,
  label,
  children,
  path,
}: SideBarNavItemProps) => {
  const activeClasses = "bg-[#1565D8] text-white";
  const nonActiveClasses = "bg-transparent text-[#62618F]";
  return (
    <Link
      href={path}
      className={`mx-4 py-2 pl-4 flex flex-row items-center text-sm font-normal gap-2 ${
        active ? activeClasses : nonActiveClasses
      }`}
    >
      {children}
      {label}
    </Link>
  );
};

export default Sidebar;
