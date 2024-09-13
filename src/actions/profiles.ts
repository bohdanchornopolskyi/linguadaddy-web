import { updateProfileSchema } from '@/actions/validation';
import { updateProfile } from '@/data-access/profiles';
import { rateLimitByKey } from '@/lib/limiter';
import { authenticatedAction } from '@/lib/safe-action';

export const updateProfileAction = authenticatedAction
  .schema(updateProfileSchema)
  .action(async ({ parsedInput: { userId, displayName, image } }) => {
    await rateLimitByKey({ key: userId, limit: 2, window: 30000 });
    await updateProfile(userId, { displayName, image });
  });
