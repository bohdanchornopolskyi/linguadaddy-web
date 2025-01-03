'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function GlobalLanguage({
  languages,
  defaultLanguageId,
  onLanguageChange,
}: {
  languages: { languageId: string; languageName: string }[];
  defaultLanguageId: string;
  onLanguageChange: (languageId: string) => void;
}) {
  if (languages.length === 0) {
    return null;
  }

  return (
    <DropdownMenuItem
      className="px-0"
      onSelect={(e) => {
        e.preventDefault();
      }}
    >
      <Select defaultValue={defaultLanguageId} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-full">
          <SelectValue
            defaultValue={
              languages.find((l) => l.languageId === defaultLanguageId)
                ?.languageName
            }
          />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.languageId} value={lang.languageId}>
              {lang.languageName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </DropdownMenuItem>
  );
}
