import { database } from '@/db';

export async function createTransaction<T extends typeof database>(
  cb: (trx: T) => void
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await database.transaction(cb as any);
}
