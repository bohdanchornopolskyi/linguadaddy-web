'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/actions/validation';
import { forgotPasswordAction } from '@/actions/emails';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    criteriaMode: 'all',
    mode: 'onChange',
    shouldFocusError: true,
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { execute, isPending } = useAction(forgotPasswordAction, {
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
        description: 'Check your email for a link to reset your password',
      });
      router.push('/');
    },
  });

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    execute(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-1/3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@email.com*"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          variant="outline"
          className="w-full gap-2 mt-4"
          type="submit"
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
