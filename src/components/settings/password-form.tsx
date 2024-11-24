'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { updatePasswordSchema } from '@/actions/validation';
import { useAction } from 'next-safe-action/hooks';
import { updatePasswordAction } from '@/actions/profiles';
import { updatePassword } from '@/data-access/accounts';

type PasswordFormValues = z.infer<typeof updatePasswordSchema>;

export function PasswordForm() {
  const { toast } = useToast();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { execute, isPending } = useAction(updatePasswordAction, {
    onError(error) {
      toast({
        title: 'Error',
        description: error.error.serverError?.message,
        variant: 'destructive',
      });
    },
    onSuccess() {
      toast({
        title: 'Password updated',
        description: 'Your password has been updated successfully.',
      });
      form.reset();
    },
  });

  async function onSubmit(data: PasswordFormValues) {
    try {
      await execute(data);
      toast({
        title: 'Password updated',
        description: 'Your password has been updated successfully.',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem updating your password.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Please confirm your new password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update password'}
        </Button>
      </form>
    </Form>
  );
}
