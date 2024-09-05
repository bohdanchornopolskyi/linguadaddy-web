import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SignInButton() {
  return (
    <Button variant="outline">
      <Link href="/signin">Sign in</Link>
    </Button>
  );
}
