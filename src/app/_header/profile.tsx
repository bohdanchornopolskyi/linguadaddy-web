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

export default function Profile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
