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
import { getCurrentUser } from '@/lib/session';
import { getProfile } from '@/data-access/profiles';

export default async function Profile() {
  const user = await getCurrentUser();
  let profile;
  if (user) {
    profile = await getProfile(user.id);
  }

  // TODO: add fallback functionality

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage image={profile?.image} />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="px-2 border-b border-gray-200 pb-2">
          Hey, {profile?.displayName}
        </div>
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
