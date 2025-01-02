'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAction } from 'next-safe-action/hooks';
import {
  createDictionaryEntryAction,
  updateDictionaryEntryAction,
} from '@/actions/dictionaries';
import { DialogTrigger } from '@radix-ui/react-dialog';

interface DictionaryEntry {
  id: string;
  word: string;
  translation: string;
}

interface DictionaryModalProps {
  mode: 'create' | 'update';
  trigger: React.ReactNode;
  entry?: DictionaryEntry;
  languageId?: string;
  onClose?: () => void;
}

export function DictionaryModal({
  mode,
  trigger,
  entry,
  languageId,
  onClose,
}: DictionaryModalProps) {
  const createAction = useAction(createDictionaryEntryAction);
  const updateAction = useAction(updateDictionaryEntryAction);

  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (entry && mode === 'update') {
      setWord(entry.word);
      setTranslation(entry.translation);
    }
  }, [entry, mode]);

  const handleSave = async () => {
    if (mode === 'create' && languageId) {
      await createAction.execute({ word, translation, languageId });
    } else if (mode === 'update' && entry) {
      await updateAction.execute({ id: entry.id, word, translation });
    }

    handleClose();
  };

  const handleClose = () => {
    setWord('');
    setTranslation('');
    setOpen(false);
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'update' ? 'Edit Word' : 'Add New Word'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="word" className="text-right">
              Word
            </Label>
            <Input
              id="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="translation" className="text-right">
              Translation
            </Label>
            <Input
              id="translation"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {' '}
          <Button
            type="submit"
            onClick={handleSave}
            disabled={createAction.isPending || updateAction.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
