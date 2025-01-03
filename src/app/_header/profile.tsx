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
import { GlobalLanguage } from './global-language';
import { getLanguagesForUser } from '@/data-access/languages';
import { updateProfile } from '@/data-access/profiles';

type ProfileProps = {
  userId: string;
};

export default async function Profile({ userId }: ProfileProps) {
  const profile = await getProfile(userId);
  const languages = await getLanguagesForUser(userId);

  async function handleLanguageChange(languageId: string) {
    'use server';
    await updateProfile(userId, { defaultLanguageId: languageId });
  }

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
        {languages.length > 0 && (
          <GlobalLanguage
            languages={languages}
            defaultLanguageId={
              profile.defaultLanguageId || languages[0].languageId
            }
            onLanguageChange={handleLanguageChange}
          />
        )}
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
