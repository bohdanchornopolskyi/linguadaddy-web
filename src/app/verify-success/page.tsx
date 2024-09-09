import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifySuccess() {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center flex-grow">
      <h1 className="text-3xl font-bold">
        Your email has been successfully verified!
      </h1>
      <Button className="text-lg" size="lg">
        <Link href="/signin">Sign in</Link>
      </Button>
    </div>
  );
}
