'use server';

import { database } from '@/db';
import { sets, setWords, Set, dictionaries, Dictionary } from '@/db/schema';
import { and, desc, eq } from 'drizzle-orm';

export const getSetsForUser = async (userId: string) => {
  return await database
    .select({
      id: sets.id,
      name: sets.name,
      createdAt: sets.createdAt,
      words: {
        id: dictionaries.id,
        word: dictionaries.word,
        translation: dictionaries.translation,
      },
    })
    .from(sets)
    .leftJoin(setWords, eq(setWords.setId, sets.id))
    .leftJoin(dictionaries, eq(dictionaries.id, setWords.wordId))
    .where(eq(sets.userId, userId))
    .orderBy(desc(sets.createdAt));
};

export const createSet = async (input: Omit<Set, 'id'>) => {
  const [newSet] = await database.insert(sets).values(input).returning();
  return newSet;
};

export const updateSet = async (set: Partial<Set>) => {
  if (!set.id) {
    return;
  }
  const [updatedSet] = await database
    .update(sets)
    .set(set)
    .where(eq(sets.id, set.id))
    .returning();
  return updatedSet;
};
