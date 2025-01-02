'use server';

import { database } from '@/db';
import { dictionaries, Dictionary } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export async function getDictionaryEntries(languageId: string, userId: string) {
  return await database.query.dictionaries.findMany({
    where: and(
      eq(dictionaries.languageId, languageId),
      eq(dictionaries.userId, userId)
    ),
  });
}

export async function deleteDictionaryEntry(id: string) {
  return await database.delete(dictionaries).where(eq(dictionaries.id, id));
}

export async function createDictionaryEntry(entry: Dictionary) {
  return await database.insert(dictionaries).values(entry);
}

export async function updateDictionaryEntry(entry: Partial<Dictionary>) {
  if (!entry.id) {
    throw new Error('Dictionary entry id is required');
  }
  return await database
    .update(dictionaries)
    .set(entry)
    .where(eq(dictionaries.id, entry.id));
}
