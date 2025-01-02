'use client';

import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type LanguageSelectorProps = {
  languages: Language[];
  defaultLanguageCode: string;
};

type Language = {
  languageId: string;
  languageName: string;
  languageCode: string;
};

export default function LanguageSelector({
  languages,
  defaultLanguageCode,
}: LanguageSelectorProps) {
  const router = useRouter();

  const handleLanguageChange = (languageCode: string) => {
    router.push(`/dictionary?language=${languageCode}`);
  };

  return (
    <Select
      defaultValue={defaultLanguageCode}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.languageId} value={language.languageCode}>
            {language.languageName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
