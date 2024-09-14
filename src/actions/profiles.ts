'use server';

import { z } from 'zod';
import { updateProfileSchema } from '@/actions/validation';
import { updateProfile } from '@/data-access/profiles';
import { AUTHENTICATION_ERROR_MESSAGE, MAX_FILE_SIZE } from '@/lib/constants';
import { PublicError } from '@/lib/errors';
import { getFileUrl, uploadFileToBucket } from '@/lib/files';
import { rateLimitByIp, rateLimitByKey } from '@/lib/limiter';
import { authenticatedAction } from '@/lib/safe-action';
import { getCurrentUser } from '@/lib/session';
import { createUUID } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const updateProfileAction = authenticatedAction
  .schema(updateProfileSchema)
  .action(async ({ parsedInput: { userId, displayName, image } }) => {
    await rateLimitByKey({ key: userId, limit: 2, window: 30000 });
    await updateProfile(userId, { displayName, image });
  });

export const updateProfileImageAction = authenticatedAction
  .schema(z.object({ formData: z.instanceof(FormData) }))
  .action(async ({ parsedInput: { formData } }) => {
    await rateLimitByIp({ key: 'image-upload', limit: 2, window: 30000 });
    const user = await getCurrentUser();
    if (!user) {
      throw new PublicError(AUTHENTICATION_ERROR_MESSAGE);
    }
    const image = formData.get('image') as File;
    if (!image) {
      throw new PublicError('Image is required');
    }
    if (!image.type.startsWith('image/')) {
      throw new PublicError('Invalid image type');
    }
    if (image.size > MAX_FILE_SIZE) {
      throw new PublicError(
        `Image size should be less than ${MAX_FILE_SIZE}MB.`
      );
    }
    const imageName = createUUID();

    await uploadFileToBucket(image, imageName);

    const imageUrl = await getFileUrl({ key: imageName });

    await updateProfile(user.id, { image: imageUrl });
    revalidatePath('/settings');
  });
