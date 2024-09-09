import { env } from '@/env';
import { ReactNode } from 'react';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export default async function sendEmail(
  email: string,
  subject: string,
  body: ReactNode
) {
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject,
    react: body,
  });

  if (error) {
    throw error;
  }
}
