'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileImageSchema } from '@/actions/validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { updateProfileImageAction } from '@/actions/profiles';

export default function ProfileImageUpload() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof updateProfileImageSchema>>({
    resolver: zodResolver(updateProfileImageSchema),
    defaultValues: {},
  });

  const { execute, isPending } = useAction(updateProfileImageAction, {
    onError(error) {
      toast({
        title: 'Error',
        description: error.error.serverError?.message,
        variant: 'destructive',
      });
    },
    onSuccess() {
      toast({
        title: 'Success',
        description: 'Your profile image has been updated',
      });
      formRef.current?.reset();
    },
  });

  async function onSubmit(data: { image: File }) {
    const formData = new FormData();
    formData.append('image', data.image);
    execute({ formData });
  }

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="image"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image*</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  multiple={false}
                  className="w-1/3"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit" className="mt-3">
          Upload
        </Button>
      </form>
    </Form>
  );
}
