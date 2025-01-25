'use server';

import { authenticatedAction } from '@/lib/safe-action';
import {
  addWordToSetSchema,
  createSetSchema,
  updateSetSchema,
} from './validation';
import { createSet, updateSet } from '@/data-access/sets';
import { PublicError } from '@/lib/errors';
import { revalidatePath } from 'next/cache';

export const createSetAction = authenticatedAction
  .schema(createSetSchema)
  .action(async ({ parsedInput: { name, languageId }, ctx: { user } }) => {
    try {
      const set = await createSet({
        name,
        userId: user,
        languageId,
      });
      revalidatePath('sets');
      return { success: true, data: set };
    } catch (error) {
      return { success: false, error: 'Failed to create set' };
    }
  });

export const updateSetAction = authenticatedAction
  .schema(updateSetSchema)
  .action(async ({ parsedInput: { id, name, languageId }, ctx: { user } }) => {
    try {
      const set = await updateSet({ id, name });
      revalidatePath('sets');
      return set;
    } catch (error) {
      throw new PublicError('Error');
    }
  });

export const addWordToSetAction = authenticatedAction
  .schema(addWordToSetSchema)
  .action(async ({ parsedInput: { words, setId }, ctx: { user } }) => {
    try {
      return;
    } catch (error) {
      return { success: false, error: 'Failed to create set' };
    }
  });
