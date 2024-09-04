import { getCurrentUser } from '@/lib/session';
import { Libre_Baskerville } from 'next/font/google';
import { cn } from '@/lib/utils';

const libre = Libre_Baskerville({ weight: '700', subsets: ['latin'] });

export async function Header() {
  const user = await getCurrentUser();

  return (
    <div className="p-4 max-w-7xl mx-auto flex items-center justify-between">
      <span className={cn('text-2xl font-bold', libre.className)}>
        Saas Starter
      </span>
      {user ? 'Signed in' : 'Not signed in'}
    </div>
  );
}
