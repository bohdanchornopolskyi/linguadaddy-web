'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { IconBrandGoogle, IconMail } from '@tabler/icons-react';
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
import { signInAction } from '@/actions/users';
import { useToast } from '@/hooks/use-toast';
import { useAction } from 'next-safe-action/hooks';
import { signInSchema } from '@/actions/validation';
import { useSession } from '@/providers/session-provider';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const { session } = useSession();
  if (session) {
    redirect('/dashboard');
  }
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    criteriaMode: 'all',
    mode: 'onChange',
    shouldFocusError: true,
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { execute, isPending } = useAction(signInAction, {
    onError(error) {
      toast({
        title: 'Error',
        description: error.error.serverError?.message,
      });
    },
    onSuccess() {
      toast({
        title: 'Success',
        description: 'You have successfully signed in',
      });
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    execute(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-1/3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password*</FormLabel>
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
            className="w-full gap-2"
            type="submit"
          >
            <IconMail />
            Continue with email
          </Button>
        </form>
      </Form>
      <span className="pt-4">Or</span>
      <div className="pt-4 w-1/3">
        <Button asChild size="lg" variant="outline" className="gap-2 w-full">
          <Link href="/api/login/google">
            <IconBrandGoogle />
            Continue with Google
          </Link>
        </Button>
      </div>
    </>
  );
}
