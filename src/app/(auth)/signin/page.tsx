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
        variant: 'destructive',
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
                <div className="text-right text-xs">
                  Forgot your password?{' '}
                  <Link
                    className="text-blue-500 pl-2 font-medium"
                    href="/forgot-password"
                  >
                    Reset Password
                  </Link>
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
            <IconMail />
            Continue with email
          </Button>
          <span className="text-center">
            Don't have an account?{' '}
            <Link className="text-blue-500 pl-2 font-medium" href="/signup">
              Sign up
            </Link>
          </span>
        </form>
      </Form>
      <div className="relative pt-4 w-1/3 text-center flex items-center justify-center">
        <div className="absolute top-1/2 left-0 w-full transform translate-y-[8px] h-[1px] bg-black/15" />
        <span className="bg-white relative z-10 block w-12">or</span>
      </div>
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
