'use server';

import { signInSchema, signUpSchema } from '@/actions/validation';
import { lucia, validateRequest } from '@/auth';
import { createAccount } from '@/data-access/accounts';
import {
  createVerifyEmailToken,
  deleteVerifyEmailToken,
  getVerifyEmailToken,
} from '@/data-access/email-verification';
import { createProfile } from '@/data-access/profiles';
import {
  createUser,
  getUserByEmail,
  updateUser,
  verifyPassword,
} from '@/data-access/users';
import { VerifyEmail } from '@/emails/verify-email';
import { env } from '@/env';
import sendEmail from '@/lib/emails';
import { EmailInUseError, LoginError, PublicError } from '@/lib/errors';
import { unauthenticatedAction } from '@/lib/safe-action';
import { setSession } from '@/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = unauthenticatedAction
  .schema(signUpSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new EmailInUseError();
    }
    const user = await createUser(email);
    await createAccount(user.id, password);

    await createProfile({ userId: user.id });

    const token = await createVerifyEmailToken(user.id);
    await sendEmail(
      email,
      `Verify your email for ${env.APPLICATION_NAME}`,
      <VerifyEmail token={token} />
    );

    // await setSession(user.id);
    return { id: user.id };
  });

export const signInAction = unauthenticatedAction
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new LoginError();
    }

    const isPasswordCorrect = await verifyPassword(email, password);

    if (!isPasswordCorrect) {
      throw new LoginError();
    }

    await setSession(user.id);

    return { id: user.id };
  });

export async function signOutAction() {
  const { session } = await validateRequest();

  if (!session) {
    redirect('/signin');
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect('/');
}

export async function verifyEmail(token: string) {
  const tokenEntry = await getVerifyEmailToken(token);

  if (!tokenEntry) {
    throw new PublicError('Invalid token');
  }

  const { userId } = tokenEntry;

  await updateUser(userId, { emailVerified: new Date() });
  await deleteVerifyEmailToken(token);
  return userId;
}
