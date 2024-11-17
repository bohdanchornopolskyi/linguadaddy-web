import { getProfile } from '@/data-access/profiles';
import { assertAuthenticated } from '@/lib/session';

export default async function DashboardPage() {
  const user = await assertAuthenticated();
  const profile = await getProfile(user.id);

  return <div>{profile.displayName ?? 'You have no name yet'}</div>;
}
