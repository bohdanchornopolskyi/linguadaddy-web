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
import { signUpAction } from '@/actions/users';
import { useToast } from '@/hooks/use-toast';
import { signUpSchema } from '@/actions/validation';
import { useAction } from 'next-safe-action/hooks';
import { redirect } from 'next/navigation';
import { useSession } from '@/providers/session-provider';
import { IconBrandGoogle, IconMail } from '@tabler/icons-react';
import Link from 'next/link';

export default function SignUpPage() {
  const { session } = useSession();
  if (session) {
    redirect('/dashboard');
  }
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signUpSchema>>({
    criteriaMode: 'all',
    mode: 'onChange',
    shouldFocusError: true,
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = form;

  function convertErrors(val: string | string[] | boolean) {
    if (typeof val === 'boolean') {
      return [];
    }
    if (typeof val === 'string') {
      return [val];
    }
    return val;
  }

  const { execute, isPending } = useAction(signUpAction, {
    onError(error) {
      toast({
        title: 'Error',
        description: error.error.serverError?.message,
      });
    },
    onSuccess() {
      toast({
        title: 'Success',
        description: 'You have successfully signed up',
      });
      redirect('/');
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    execute(data);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-1/3">
          <FormField
            control={control}
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
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <div className="flex flex-col text-sm">
                  {errors.password?.types?.custom &&
                    convertErrors(errors.password?.types?.custom).map(
                      (error) => (
                        <span className="text-destructive" key={error}>
                          {error}
                        </span>
                      )
                    )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password*</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
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
