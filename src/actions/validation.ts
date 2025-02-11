import { languages } from '@/db/schema';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/constants';
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

export const updateProfileImageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

export const updateProfileSchema = z.object({
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

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    newPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const addLanguageSchema = z.object({
  language: z.string().min(1, { message: 'Language is required' }),
  code: z.string().min(1, { message: 'Code is required' }),
});

export const createDictionaryEntrySchema = z.object({
  word: z.string().min(1, { message: 'Word is required' }),
  translation: z.string().min(1, { message: 'Translation is required' }),
  languageId: z.string().min(1, { message: 'Language is required' }),
});

export const updateDictionaryEntrySchema = z.object({
  id: z.string().min(1, { message: 'Id is required' }),
  word: z.string().min(1, { message: 'Word is required' }),
  translation: z.string().min(1, { message: 'Translation is required' }),
});

export const deleteDictionaryEntrySchema = z.object({
  id: z.string().min(1, { message: 'Id is required' }),
});

export const createSetSchema = z.object({
  name: z.string().min(1),
  languageId: z.string().uuid(),
});

export const updateSetSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  languageId: z.string().uuid(),
});

export const addWordToSetSchema = z.object({
  setId: z.string().uuid(),
  words: z.array(
    z.object({
      word: z.string(),
      translation: z.string(),
    })
  ),
});
