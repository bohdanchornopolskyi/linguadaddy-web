import { database } from '@/db';
import { languages, userLanguages } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getLanguagesForUser(userId: string) {
  const userLanguagesData = await database
    .select({
      languageId: userLanguages.languageId,
      languageName: languages.name,
      languageCode: languages.code,
    })
    .from(userLanguages)
    .innerJoin(languages, eq(userLanguages.languageId, languages.id))
    .where(eq(userLanguages.userId, userId));

  return userLanguagesData;
}

export async function addLanguageForUser(
  userId: string,
  language: string,
  code: string
) {
  let languageId;
  const existingLanguage = await database
    .select()
    .from(languages)
    .where(eq(languages.name, language));

  if (existingLanguage.length === 0) {
    const newLanguage = await database
      .insert(languages)
      .values({ name: language, code })
      .returning();
    languageId = newLanguage[0].id;
  } else {
    languageId = existingLanguage[0].id;
  }

  return await database
    .insert(userLanguages)
    .values({ userId, languageId })
    .returning();
}
