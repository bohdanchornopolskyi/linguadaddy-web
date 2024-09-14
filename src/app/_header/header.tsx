import { getCurrentUser } from '@/lib/session';
import { Libre_Baskerville } from 'next/font/google';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Profile from '@/app/_header/profile';
import { SignInButton } from '@/app/_header/signin';
import { ThemeToggle } from '@/app/_header/themeToggle';

const libre = Libre_Baskerville({ weight: '700', subsets: ['latin'] });

export async function Header() {
  const user = await getCurrentUser();

  // if (user) {
  // }

  return (
    <div className="w-full p-4 max-w-7xl mx-auto flex items-center justify-between">
      <Link href={user ? '/dashboard' : '/'}>
        <span className={cn('text-2xl font-bold', libre.className)}>
          Saas Starter
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? <Profile userId={user.id} /> : <SignInButton />}
      </div>
    </div>
  );
}
