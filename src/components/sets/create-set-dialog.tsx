'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAction } from 'next-safe-action/hooks';
import { createSetAction } from '@/actions/sets';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface DictionaryWord {
  id: string;
  word: string;
  translation: string;
}

interface Word {
  word: string;
  translation: string;
}

interface CreateSetDialogProps {
  dictionary?: DictionaryWord[];
  defaultLanguageId: string;
}

export function CreateSetDialog({ defaultLanguageId }: CreateSetDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const { execute, status } = useAction(createSetAction, {
    onSuccess() {
      setOpen(false);
      setName('');
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    execute({ name, languageId: defaultLanguageId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Set
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new set</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            placeholder="Set name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" disabled={status === 'executing'}>
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
