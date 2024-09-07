import { getProfile } from '@/data-access/profiles';
import { Profile } from '@/db/schema';
import { getCurrentUser } from '@/lib/session';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  let profile: Profile | undefined;
  if (user) {
    profile = await getProfile(user.id);
  }
  return <div>{profile ? profile.displayName : 'You have no name yet'}</div>;
}
