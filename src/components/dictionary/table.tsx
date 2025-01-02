import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DictionaryModal } from '@/components/dictionary/dictionary-modal';
import TableRowTemplate from '@/components/dictionary/table-row';
import { getDictionaryEntries } from '@/data-access/dictionaries';
import { getCurrentUser } from '@/lib/session';
import { createDictionaryEntryAction } from '@/actions/dictionaries';

export default async function DictionaryTable({
  languageId,
}: {
  languageId: string;
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }
  const entries = await getDictionaryEntries(languageId, user.id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Dictionary</h1>
      <DictionaryModal
        mode="create"
        trigger={<Button>Add New Word</Button>}
        languageId={languageId}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Word</TableHead>
            <TableHead>Translation/Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                You have no words in this dictionary yet
              </TableCell>
            </TableRow>
          )}
          {entries.map((entry) => (
            <TableRowTemplate
              key={entry.id}
              entry={{
                id: entry.id,
                word: entry.word,
                translation: entry.translation,
              }}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
