'use client';

import { AvatarImage } from '@/components/ui/avatar';
import { useTheme } from 'next-themes';

export function Avatar() {
  const { theme } = useTheme();
  return (
    <AvatarImage
      className=""
      src={theme === 'dark' ? '/profile-light.png' : '/profile-dark.png'}
    />
  );
}
