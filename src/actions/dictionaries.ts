'use server';

import {
  createDictionaryEntrySchema,
  deleteDictionaryEntrySchema,
  updateDictionaryEntrySchema,
} from '@/actions/validation';
import {
  createDictionaryEntry,
  deleteDictionaryEntry,
  updateDictionaryEntry,
} from '@/data-access/dictionaries';
import { AUTHENTICATION_ERROR_MESSAGE } from '@/lib/constants';
import { PublicError } from '@/lib/errors';
import { authenticatedAction } from '@/lib/safe-action';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export const createDictionaryEntryAction = authenticatedAction
  .schema(createDictionaryEntrySchema)
  .action(async ({ parsedInput: { word, translation, languageId } }) => {
    const user = await getCurrentUser();
    if (!user) {
      throw new PublicError(AUTHENTICATION_ERROR_MESSAGE);
    }
    const result = await createDictionaryEntry({
      word,
      translation,
      userId: user.id,
      languageId,
    });
    revalidatePath(`/dictionary`);
    return result;
  });

export const updateDictionaryEntryAction = authenticatedAction
  .schema(updateDictionaryEntrySchema)
  .action(async ({ parsedInput: { id, word, translation } }) => {
    const result = await updateDictionaryEntry({ id, word, translation });
    revalidatePath(`/dictionary`);
    return result;
  });

export const deleteDictionaryEntryAction = authenticatedAction
  .schema(deleteDictionaryEntrySchema)
  .action(async ({ parsedInput: { id } }) => {
    await deleteDictionaryEntry(id);
    revalidatePath(`/dictionary`);
  });
