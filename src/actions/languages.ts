'use server';

import { addLanguageSchema } from '@/actions/validation';
import { addLanguageForUser } from '@/data-access/languages';
import { AUTHENTICATION_ERROR_MESSAGE } from '@/lib/constants';
import { PublicError } from '@/lib/errors';
import { authenticatedAction } from '@/lib/safe-action';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export const addLanguageAction = authenticatedAction
  .schema(addLanguageSchema)
  .action(async ({ parsedInput: { code, language } }) => {
    const user = await getCurrentUser();
    if (!user) {
      throw new PublicError(AUTHENTICATION_ERROR_MESSAGE);
    }
    const lang = await addLanguageForUser(user.id, language, code);
    revalidatePath('/dictionary');
    return lang;
  });
