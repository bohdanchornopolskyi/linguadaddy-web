import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { assertAuthenticated } from '@/lib/session';
import Confetti from '@/components/confetti';

export default async function SuccessPage() {
  const user = await assertAuthenticated();
  return (
    <>
      <Confetti />
      <main>
        <div className={'relative h-screen overflow-hidden'}>
          <div
            className={'absolute inset-0 px-6 flex items-center justify-center'}
          >
            <div
              className={'flex flex-col items-center text-white text-center'}
            >
              <Image
                className={'pb-12'}
                src={'/assets/icons/logo/aeroedit-success-icon.svg'}
                alt={'Success icon'}
                height={96}
                width={96}
              />
              <h1
                className={
                  'text-4xl md:text-[80px] leading-9 md:leading-[80px] font-medium pb-6'
                }
              >
                Payment successful
              </h1>
              <p className={'text-lg pb-16'}>
                Success! Your payment is complete, and you’re all set.
              </p>
              <Button variant={'secondary'} asChild={true}>
                {user ? (
                  <Link href={'/dashboard'}>Go to Dashboard</Link>
                ) : (
                  <Link href={'/'}>Go to Home</Link>
                )}
              </Button>
            </div>
          </div>
          <div className={'absolute bottom-0 w-full'}></div>
        </div>
      </main>
    </>
  );
}
