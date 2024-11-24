import SignOut from '@/app/_header/signout';
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Avatar as AvatarImage } from '@/app/_header/avatar';
import { getProfile } from '@/data-access/profiles';
import Link from 'next/link';

type ProfileProps = {
  userId: string;
};

export default async function Profile({ userId }: ProfileProps) {
  const profile = await getProfile(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage image={profile?.image} />
          <AvatarFallback className="w-full h-full flex items-center justify-center">
            {profile?.displayName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="px-2 border-b border-gray-200 pb-2">
          {profile?.displayName && `Hey, ${profile.displayName}`}
        </div>
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
