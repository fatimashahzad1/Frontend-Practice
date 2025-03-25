'use client';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ROUTES } from '@/constants/routes';
import { removeToken } from '@/lib/get-token';
import useUser from '@/hooks/use-user';

export default function AvatarDropdown() {
  const router = useRouter();
  const { data: user } = useUser();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="max-lg:hidden rounded-lg lg:ml-8 hover:cursor-pointer">
            <AvatarImage src={user?.pictureUrl} alt={user?.firstName} />
            <AvatarFallback className="border-2">U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => router.push(ROUTES.settingsGeneral)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              await removeToken();
              router.push(ROUTES.login);
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Avatar only for smaller screens */}
      <Avatar className="rounded-lg lg:ml-8 lg:hidden">
        <AvatarImage src={user?.pictureUrl} alt={user?.firstName} />
        <AvatarFallback className="border-2">U</AvatarFallback>
      </Avatar>
    </>
  );
}
