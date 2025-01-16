"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DashboardNavbarLogo from "../icons/dashboard-navbar-logo";
import MenuIcon from "../icons/menu-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ROUTES } from "@/constants/routes";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-8 justify-between">
      {/* for Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <DashboardNavbarLogo />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            <NavbarLink
              href={ROUTES.feed}
              title="Feed"
              prefetch={false}
              isMobile={true}
              pathname={pathname}
            />
            <NavbarLink
              href={ROUTES.chats}
              title="Chats"
              prefetch={false}
              isMobile={true}
              pathname={pathname}
            />
            <NavbarLink
              href={ROUTES.jobs}
              title="Jobs"
              prefetch={false}
              isMobile={true}
              pathname={pathname}
            />
            <NavbarLink
              href={ROUTES.events}
              title="Events"
              prefetch={false}
              isMobile={true}
              pathname={pathname}
            />
            <NavbarLink
              href={ROUTES.articles}
              title="Articles"
              prefetch={false}
              isMobile={true}
              pathname={pathname}
            />
            <NavbarLink
              href={ROUTES.people}
              title="People"
              prefetch={false}
              isMobile={true}
              pathname={pathname}
            />
            <NavbarLink
              href={ROUTES.feed}
              title="Notifications"
              prefetch={false}
              isMobile={true}
              pathname={pathname}
            />
          </div>
        </SheetContent>
      </Sheet>
      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <DashboardNavbarLogo />
        <span className="sr-only">Acme Inc</span>
      </Link>
      {/* for Desktop */}
      <p className="lg:hidden text-lg text-text">Feed</p>
      <nav className="ml-auto hidden lg:flex gap-6">
        <NavbarLink
          href={ROUTES.feed}
          title="Feed"
          prefetch={false}
          pathname={pathname}
        />
        <NavbarLink
          href={ROUTES.chats}
          title="Chats"
          prefetch={false}
          pathname={pathname}
        />
        <NavbarLink
          href={ROUTES.jobs}
          title="Jobs"
          prefetch={false}
          pathname={pathname}
        />
        <NavbarLink
          href={ROUTES.events}
          title="Events"
          prefetch={false}
          pathname={pathname}
        />
        <NavbarLink
          href={ROUTES.articles}
          title="Articles"
          prefetch={false}
          pathname={pathname}
        />
        <NavbarLink
          href={ROUTES.people}
          title="People"
          prefetch={false}
          pathname={pathname}
        />
        <NavbarLink
          href={ROUTES.root}
          title="Notifications"
          prefetch={false}
          pathname={pathname}
        />
      </nav>

      <Avatar
        className="rounded-lg lg:ml-8 hover:cursor-pointer"
        onClick={() => {
          router.push(ROUTES.settingsGeneral);
        }}
      >
        <AvatarImage
          src="https://originui.com/avatar-80-07.jpg"
          alt="Kelly King"
        />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </header>
  );
}

type NavbarLinkProps = {
  href: string;
  prefetch: boolean;
  title: string;
  pathname: string;
  isMobile?: boolean;
};
const NavbarLink = ({
  href,
  prefetch,
  title,
  pathname,
  isMobile = false,
}: NavbarLinkProps) => {
  const ActiveTitle =
    pathname === href
      ? "text-primaryBlue font-bold"
      : "text-textGrey font-medium";
  const styleToBeApplied = isMobile
    ? `flex w-full items-center py-2 text-lg font-semibold ${ActiveTitle}`
    : `group inline-flex h-9 w-max items-center ${ActiveTitle} justify-center rounded-md bg-white px-4 py-2 text-base transition-colors hover:text-primaryBlue focus:outline-none`;

  return (
    <Link href={href} className={styleToBeApplied} prefetch={prefetch}>
      {title}
    </Link>
  );
};
