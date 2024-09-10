import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z.string().superRefine((password, ctx) => {
      if (password.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must be at least 6 characters long',
        });
      }
      // if (!/[A-Z]/.test(password)) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Password must contain at least one uppercase letter',
      //   });
      // }
      // if (!/[a-z]/.test(password)) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Password must contain at least one lowercase letter',
      //   });
      // }
      // if (!/[0-9]/.test(password)) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Password must contain at least one number',
      //   });
      // }
      // if (!/[!@#$%^&*]/.test(password)) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Password must contain at least one special character',
      //   });
      // }
    }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export const updateProfileSchema = z.object({
  userId: z.string(),
  displayName: z
    .string()
    .min(2, { message: 'Display name is required' })
    .optional(),
  image: z.string().optional(),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: 'Token is required' }),
    password: z.string().superRefine((password, ctx) => {
      if (password.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must be at least 6 characters long',
        });
      }
      // if (!/[A-Z]/.test(password)) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Password must contain at least one uppercase letter',
      //   });
      // }
      // if (!/[a-z]/.test(password)) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Password must contain at least one lowercase letter',
      //   });
      // }
      // if (!/[0-9]/.test(password)) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Password must contain at least one number',
      //   });
      // }
      // if (!/[!@#$%^&*]/.test(password)) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Password must contain at least one special character',
      //   });
      // }
    }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field is required' })
    .email({ message: 'Invalid email' }),
});
