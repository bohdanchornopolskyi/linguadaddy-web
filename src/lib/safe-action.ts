import { PublicError } from '@/lib/errors';
import { getCurrentUser } from '@/lib/session';
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';

const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof PublicError) {
      return {
        message: e.message,
      };
    }
    return { message: DEFAULT_SERVER_ERROR_MESSAGE };
  },
});

export const authenticatedAction = actionClient.use(async ({ next }) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('You must be logged in to perform this action');
  }
  return next({ ctx: { user: user.id } });
});

export const unauthenticatedAction = actionClient;
