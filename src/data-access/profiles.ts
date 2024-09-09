import { eq } from 'drizzle-orm';
import { database } from '@/db';
import { Profile, profiles } from '@/db/schema';

export async function createProfile(data: Profile) {
  const [profile] = await database
    .insert(profiles)
    .values(data)
    .onConflictDoNothing()
    .returning();
  return profile;
}

export async function updateProfile(userId: string, data: Partial<Profile>) {
  await database.update(profiles).set(data).where(eq(profiles.userId, userId));
}

export async function getProfile(userId: string) {
  const profile = await database.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  return profile;
}
