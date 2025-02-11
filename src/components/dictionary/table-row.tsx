'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { DictionaryModal } from '@/components/dictionary/dictionary-modal';
import { deleteDictionaryEntryAction } from '@/actions/dictionaries';
import { useAction } from 'next-safe-action/hooks';
import DeleteDialog from '@/components/shared/delete-dialog';

type DictionaryEntry = {
  id: string;
  word: string;
  translation: string;
};

function TableRowTemplate({ entry }: { entry: DictionaryEntry }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { execute, isPending } = useAction(deleteDictionaryEntryAction);

  const handleDelete = () => {
    execute({ id: entry.id });
    setIsDeleteDialogOpen(false);
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <TableRow key={entry.id}>
        <TableCell>{entry.word}</TableCell>
        <TableCell>{entry.translation}</TableCell>
        <TableCell>
          <DictionaryModal
            mode="update"
            trigger={
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            }
            entry={entry}
          />
          <Button variant="ghost" size="icon" onClick={openDeleteDialog}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
      <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default TableRowTemplate;
