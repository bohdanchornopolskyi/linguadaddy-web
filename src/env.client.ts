import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_PADDLE_VENDOR_ID: z.string().min(1),
    NEXT_PUBLIC_PADDLE_CLIENT_TOKEN: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_PADDLE_VENDOR_ID: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID,
    NEXT_PUBLIC_PADDLE_CLIENT_TOKEN:
      process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
  },
});
