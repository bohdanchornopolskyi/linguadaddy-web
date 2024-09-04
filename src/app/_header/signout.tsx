import { signOutAction } from '@/actions/users';
import { Button } from '@/components/ui/button';

export default async function SignOut() {
  return (
    <Button onClick={signOutAction} type="submit" variant="ghost">
      Sign Out
    </Button>
  );
}
