'use server';

import { unauthenticatedAction } from '@/lib/safe-action';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from '@/actions/validation';
import { PublicError } from '@/lib/errors';
import {
  createPasswordResetToken,
  deletePasswordResetToken,
  getPasswordResetToken,
} from '@/data-access/reset-password';
import { env } from '@/env';
import { ResetPassword } from '@/emails/reset-password';
import { getUserByEmail } from '@/data-access/users';
import sendEmail from '@/lib/emails';
import { updatePassword } from '@/data-access/accounts';
import { deleteSessionForUser } from '@/data-access/sessions';
import { createTransaction } from '@/data-access/transaction';

export const resetPasswordAction = unauthenticatedAction
  .schema(resetPasswordSchema)
  .action(
    async ({ parsedInput: { token, password, passwordConfirmation } }) => {
      if (password !== passwordConfirmation) {
        throw new PublicError('Passwords do not match');
      }
      const tokenEntry = await getPasswordResetToken(token);
      if (!tokenEntry) {
        throw new PublicError('Invalid token');
      }
      await createTransaction(async (trx) => {
        await updatePassword(tokenEntry.userId, password, trx);
        await deletePasswordResetToken(token, trx);
        await deleteSessionForUser(tokenEntry.userId, trx);
      });
    }
  );

export const forgotPasswordAction = unauthenticatedAction
  .schema(forgotPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new PublicError('User with that email does not exist');
    }

    const token = await createPasswordResetToken(user.id);
    await sendEmail(
      email,
      `Reset your password for ${env.APPLICATION_NAME}`,
      <ResetPassword token={token} />
    );
  });
