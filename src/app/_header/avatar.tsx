'use client';

import { AvatarImage } from '@/components/ui/avatar';
import { useTheme } from 'next-themes';

type AvatarProps = {
  image?: string | null;
};

export function Avatar({ image }: AvatarProps) {
  const { theme } = useTheme();
  let profileImage = '/profile-dark.png';
  if (theme === 'dark') {
    profileImage = '/profile-light.png';
  }
  return <AvatarImage className="" src={image || profileImage} />;
}
