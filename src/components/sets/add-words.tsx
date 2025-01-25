'use client';

import { addWordToSetAction } from '@/actions/sets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import React, { useState } from 'react';

interface DictionaryWord {
  id: string;
  word: string;
  translation: string;
}

export default function AddWords({ setId }: { setId: string }) {
  const [words, setWords] = useState<DictionaryWord[]>([]);
  const { execute, isPending } = useAction(addWordToSetAction);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // execute({ words, setId });
    // setWord('');
    // setTranslation('');
    console.log('submit');
  };

  const addWord = () => {
    setWords([...words, { id: '', word: '', translation: '' }]);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {words.map((word, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <div className="space-y-2">
            <Label htmlFor={`word-${index}`}>Word:</Label>
            <Input
              type="text"
              id={`word-${index}`}
              value={word.word}
              onChange={(e) =>
                setWords(
                  words.map((w, i) =>
                    i === index ? { ...w, word: e.target.value } : w
                  )
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`translation-${index}`}>Translation:</Label>
            <Input
              type="text"
              id={`translation-${index}`}
              value={word.translation}
              onChange={(e) =>
                setWords(
                  words.map((w, i) =>
                    i === index ? { ...w, translation: e.target.value } : w
                  )
                )
              }
            />
          </div>
        </div>
      ))}
      <div className="flex justify-end gap-2">
        <Button variant={'outline'} onClick={addWord}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant={'outline'} type="submit" disabled={isPending}>
          Submit
        </Button>
      </div>
    </form>
  );
}
