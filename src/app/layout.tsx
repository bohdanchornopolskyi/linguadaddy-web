import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Header } from '@/app/_header/header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { SessionProvider } from '@/providers/session-provider';
import { validateRequest } from '@/auth';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SaaS Starter',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  return (
    <html lang="en">
      <body>
        <div
          className={cn(
            openSans.className,
            'min-h-screen w-full flex flex-col'
          )}
        >
          <ThemeProvider>
            <SessionProvider value={session}>
              <Header />
              {children}
              <Toaster />
            </SessionProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
