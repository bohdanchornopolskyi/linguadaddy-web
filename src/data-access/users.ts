import { getAccountByUserId, hashPassword } from '@/data-access/accounts';
import { getProfile } from '@/data-access/profiles';
import { database } from '@/db';
import { User, users } from '@/db/schema';
import { AuthenticationError } from '@/lib/errors';
import { getCurrentUser } from '@/lib/session';
import { eq } from 'drizzle-orm';

export async function createUser(email: string) {
  const [user] = await database.insert(users).values({ email }).returning();
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await database.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function updateUser(userId: string, updatedUser: Partial<User>) {
  await database.update(users).set(updatedUser).where(eq(users.id, userId));
}

export async function deleteUser(userId: string) {
  await database.delete(users).where(eq(users.id, userId));
}

export async function setEmailVerified(userId: string) {
  await database
    .update(users)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(users.id, userId));
}

export async function verifyPassword(email: string, plainTextPassword: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }

  const account = await getAccountByUserId(user.id);

  if (!account) {
    return false;
  }

  const { salt } = account;
  const savedPassword = account.password;

  if (!salt || !savedPassword) {
    return false;
  }

  const hash = await hashPassword(plainTextPassword, salt);
  return account.password === hash;
}

export async function getUserWithProfile() {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  const profile = await getProfile(user.id);
  return { user, profile };
}
