import { eq } from 'drizzle-orm';
import { TOKEN_LENGTH, TOKEN_TTL } from '@/lib/constants';
import { generateRandomToken } from '@/lib/utils';
import { database } from '@/db';
import { verifyEmailTokens } from '@/db/schema';

export async function createVerifyEmailToken(userId: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await database
    .insert(verifyEmailTokens)
    .values({
      userId,
      token,
      tokenExpiresAt,
    })
    .onConflictDoUpdate({
      target: verifyEmailTokens.id,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
}

export async function getVerifyEmailToken(token: string) {
  const existingToken = await database.query.verifyEmailTokens.findFirst({
    where: eq(verifyEmailTokens.token, token),
  });

  return existingToken;
}

export async function deleteVerifyEmailToken(token: string) {
  await database
    .delete(verifyEmailTokens)
    .where(eq(verifyEmailTokens.token, token));
}
