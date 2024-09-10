'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
import { useAction } from 'next-safe-action/hooks';
import { resetPasswordSchema } from '@/actions/validation';
import { resetPasswordAction } from '@/actions/emails';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  if (!searchParams.token) {
    toast({
      title: 'Error',
      description: 'Action forbidden',
    });
    router.push('/');
  }
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    criteriaMode: 'all',
    mode: 'onChange',
    shouldFocusError: true,
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: searchParams.token,
      password: '',
      passwordConfirmation: '',
    },
  });

  const { execute, isPending } = useAction(resetPasswordAction, {
    onError(error) {
      toast({
        title: 'Error',
        description: error.error.serverError?.message,
      });
    },
    onSuccess() {
      toast({
        title: 'Success',
        description: 'You have successfully upated your password',
      });
      router.push('/signin');
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password*</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirmation*</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <div className="flex flex-col text-sm">
                <FormMessage />
              </div>
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
