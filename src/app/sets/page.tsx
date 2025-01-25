import { redirect } from 'next/navigation';
import { getSetsForUser } from '@/data-access/sets';
import { getCurrentUser } from '@/lib/session';
import { Set } from '@/components/sets/set';
import { CreateSetDialog } from '@/components/sets/create-set-dialog';
import { getProfile } from '@/data-access/profiles';
import { getDictionaryEntries } from '@/data-access/dictionaries';

export default async function Sets() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const sets = await getSetsForUser(user.id);
  const profile = await getProfile(user.id);
  if (!profile.defaultLanguageId) {
    return;
  }
  const dictionary = await getDictionaryEntries(
    profile.defaultLanguageId,
    user.id
  );

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Sets</h1>
        <CreateSetDialog
          dictionary={dictionary}
          defaultLanguageId={profile.defaultLanguageId}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 2xl:grid-cols-4">
        {sets.map((set) => (
          <Set id={set.id} name={set.name} words={set.words} key={set.id} />
        ))}
      </div>
    </>
  );
}
