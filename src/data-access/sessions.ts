import { eq } from 'drizzle-orm';
import { database } from '@/db';
import { sessions } from '@/db/schema';

export async function deleteSessionForUser(userId: string, trx = database) {
  await trx.delete(sessions).where(eq(sessions.userId, userId));
}
