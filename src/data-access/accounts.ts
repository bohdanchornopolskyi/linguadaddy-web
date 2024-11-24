import { database } from '@/db';
import { accounts } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import crypto from 'crypto';
import { ITERATIONS } from '@/lib/constants';
import { PublicError } from '@/lib/errors';

export async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      ITERATIONS,
      64,
      'sha512',
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      }
    );
  });
}

export async function createAccount(userId: string, password: string) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = await hashPassword(password, salt);
  const [account] = await database
    .insert(accounts)
    .values({
      userId,
      accountType: 'email',
      password: hash,
      salt,
    })
    .returning();
  return account;
}

export async function getAccountByUserId(userId: string) {
  const account = await database.query.accounts.findFirst({
    where: eq(accounts.userId, userId),
  });

  if (!account) {
    throw new PublicError('Account not found');
  }

  return account;
}

export async function updatePassword(
  userId: string,
  password: string,
  trx = database
) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = await hashPassword(password, salt);
  await trx
    .update(accounts)
    .set({
      password: hash,
      salt,
    })
    .where(and(eq(accounts.userId, userId), eq(accounts.accountType, 'email')));
}

export async function getAccountByGoogleId(googleId: string) {
  return database.query.accounts.findFirst({
    where: eq(accounts.googleId, googleId),
  });
}

export async function createAccountWithGoogle(
  userId: string,
  googleId: string
) {
  const account = await database
    .insert(accounts)
    .values({
      userId,
      accountType: 'google',
      googleId,
    })
    .onConflictDoNothing()
    .returning();
  return account;
}
