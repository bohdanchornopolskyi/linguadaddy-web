'use server';

import { z } from 'zod';
import {
  updatePasswordSchema,
  updateProfileSchema,
} from '@/actions/validation';
import { updateProfile } from '@/data-access/profiles';
import { AUTHENTICATION_ERROR_MESSAGE, MAX_FILE_SIZE } from '@/lib/constants';
import { PublicError } from '@/lib/errors';
import { getFileUrl, uploadFileToBucket } from '@/lib/files';
import { rateLimitByIp, rateLimitByKey } from '@/lib/limiter';
import { authenticatedAction } from '@/lib/safe-action';
import { getCurrentUser } from '@/lib/session';
import { createUUID } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { updatePassword } from '@/data-access/accounts';
import { verifyPassword } from '@/data-access/users';

export const updateProfileAction = authenticatedAction
  .schema(updateProfileSchema)
  .action(async ({ parsedInput: { displayName, image } }) => {
    const user = await getCurrentUser();
    if (!user) {
      throw new PublicError(AUTHENTICATION_ERROR_MESSAGE);
    }

    await rateLimitByKey({ key: user.id, limit: 2, window: 30000 });

    const updateData: { displayName?: string; image?: string } = {};
    if (displayName) {
      updateData.displayName = displayName;
    }

    if (image) {
      await rateLimitByIp({ key: 'image-upload', limit: 2, window: 30000 });

      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      const byteString = atob(base64Data);
      const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const imageFile = new File([blob], createUUID(), { type: mimeString });

      if (imageFile.size > MAX_FILE_SIZE) {
        throw new PublicError(
          `Image size should be less than ${MAX_FILE_SIZE}MB.`
        );
      }

      const imageName = createUUID();
      await uploadFileToBucket(imageFile, imageName);
      const imageUrl = await getFileUrl({ key: imageName });
      updateData.image = imageUrl;
    }

    await updateProfile(user.id, updateData);
    revalidatePath('/settings');
  });

export const updatePasswordAction = authenticatedAction
  .schema(updatePasswordSchema)
  .action(async ({ parsedInput: { currentPassword, newPassword } }) => {
    const user = await getCurrentUser();
    if (!user) {
      throw new PublicError(AUTHENTICATION_ERROR_MESSAGE);
    }

    const isPasswordCorrect = await verifyPassword(user.email, currentPassword);

    if (!isPasswordCorrect) {
      throw new PublicError('Current password is incorrect');
    }

    await updatePassword(user.id, newPassword);
  });
