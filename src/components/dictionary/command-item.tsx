'use client';

import { CommandItem as CommandItemBase } from '@/components/ui/command';
import { addLanguageAction } from '@/actions/languages';
import { useAction } from 'next-safe-action/hooks';
import { DialogClose } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

type CommandItemProps = {
  language: {
    name: string;
    code: string;
  };
};

export function CommandItem({ language }: CommandItemProps) {
  const router = useRouter();
  const { execute } = useAction(addLanguageAction, {
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      console.log('success');
    },
  });

  function handleAddLanguage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    execute({ language: language.name, code: language.code });
  }

  return (
    <CommandItemBase asChild className="cursor-pointer w-full">
      <DialogClose asChild>
        <form className="w-full" onSubmit={handleAddLanguage}>
          <button className="w-full text-start" type="submit">
            {language.name}
          </button>
        </form>
      </DialogClose>
    </CommandItemBase>
  );
}
