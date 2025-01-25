import AddWords from '@/components/sets/add-words';
import SetSettings from '@/components/sets/set-settings';

type SetProps = {
  id: string;
  name: string;
  words: { id: string; word: string; translation: string } | null;
};

export function Set({ id, name, words }: SetProps) {
  return (
    <div className="border border-border flex flex-col p-6 gap-4 rounded-lg">
      <div className="flex items-center justify-between gap-6">
        <span className="text-lg font-semibold">{name}</span>
        <SetSettings set={{ id, name }} />
      </div>
      <span>{words ? JSON.stringify(words) : <AddWords setId={id} />}</span>
    </div>
  );
}
