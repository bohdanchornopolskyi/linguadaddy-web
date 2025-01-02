import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CommandItem } from '@/components/dictionary/command-item';
import { CommandInput, CommandList, Command } from '@/components/ui/command';
import { AVAILABLE_LANGUAGES as availableLanguages } from '@/lib/constants';

function AddLanguage() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add a Language</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a language</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            {availableLanguages.map((language) => (
              <CommandItem key={language.code} language={language} />
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export default AddLanguage;
