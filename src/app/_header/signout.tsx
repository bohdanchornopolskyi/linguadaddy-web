'use client';

import { signOutAction } from '@/actions/users';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export default function SignOut() {
  return (
    <DropdownMenuItem
      className="cursor-pointer border-t border-gray-200"
      onSelect={async () => {
        await signOutAction();
      }}
    >
      Sign Out
    </DropdownMenuItem>
  );
}
