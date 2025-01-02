import { redirect } from 'next/navigation';
import { getLanguagesForUser } from '@/data-access/languages';
import { getCurrentUser } from '@/lib/session';
import AddLanguage from '@/components/dictionary/add-language';
import DictionaryTable from '@/components/dictionary/table';
import LanguageSelector from '@/components/dictionary/language-selector';

async function DictionaryPage({
  searchParams,
}: {
  searchParams: { language?: string };
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const languages = await getLanguagesForUser(user.id);
  if (!languages.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 w-full py-6">
        <div className="mb-6 flex items-center justify-between gap-6">
          <p>You have no languages yet</p>
          <AddLanguage />
        </div>
      </div>
    );
  }

  const { language } = await searchParams;
  const selectedLanguage =
    languages.find((lang) => lang.languageCode === language) || languages[0];

  if (!language) {
    redirect(`/dictionary?language=${languages[0].languageCode}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 w-full py-6">
      <div className="mb-6 flex items-center justify-between gap-6">
        <LanguageSelector
          languages={languages}
          defaultLanguageCode={selectedLanguage.languageCode}
        />
      </div>
      <div>Dictionary content for {selectedLanguage.languageName}</div>
      <DictionaryTable languageId={selectedLanguage.languageId} />
    </div>
  );
}

export default DictionaryPage;
