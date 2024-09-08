import { updateProfileSchema } from '@/actions/validation';
import { updateProfile } from '@/data-access/profiles';
import { authenticatedAction } from '@/lib/safe-action';

export const updateProfileAction = authenticatedAction
  .schema(updateProfileSchema)
  .action(async ({ parsedInput: { userId, displayName, image } }) => {
    await updateProfile(userId, { displayName, image });
  });
