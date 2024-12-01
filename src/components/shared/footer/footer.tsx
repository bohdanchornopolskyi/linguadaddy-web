import { cn } from '@/lib/utils';
import { Libre_Baskerville } from 'next/font/google';
import Link from 'next/link';
import React from 'react';

const libre = Libre_Baskerville({ weight: '700', subsets: ['latin'] });

function Footer() {
  return (
    <div className="pt-12 border-t bg-background text-foreground border-border">
      <div className="mx-auto max-w-7xl px-4 space-y-12">
        <div className="w-full flex gap-6 justify-between">
          <Link
            href={'/'}
            className={cn('text-2xl font-bold', libre.className)}
          >
            SaaS starter
          </Link>
          <ul className="flex flexcol gap-2">
            <li>
              <Link href={'/pricing'} className="hover:text-foreground/90">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-t border-border w-full flex justify-center items-center py-4">
          <p className="text-sm text-center text-foreground/60">
            &copy; {new Date().getFullYear()} SaaS starter. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
