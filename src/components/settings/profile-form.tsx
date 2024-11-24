'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { updateProfileSchema } from '@/actions/validation';
import { updateProfileAction } from '@/actions/profiles';
import { useAction } from 'next-safe-action/hooks';
import { ImageCropper } from '@/components/settings/cropper';

type ProfileFormProps = {
  image: string;
  displayName: string;
};

type ProfileFormValues = z.infer<typeof updateProfileSchema>;

export function ProfileForm({ image, displayName }: ProfileFormProps) {
  const { toast } = useToast();
  const [avatar, setAvatar] = useState(image);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [lastUploadedImage, setLastUploadedImage] = useState<string | null>(
    null
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { image: undefined, displayName },
    mode: 'onChange',
  });

  const { execute, isPending } = useAction(updateProfileAction);

  async function onSubmit(data: ProfileFormValues) {
    try {
      await execute({ ...data, image: avatar });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem updating your profile.',
        variant: 'destructive',
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          className="object-cover"
                          src={avatar}
                          alt="Profile picture"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      {lastUploadedImage && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setImageToCrop(lastUploadedImage)}
                        >
                          Adjust Crop
                        </Button>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="w-1/3 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            const result = e.target?.result as string;
                            setImageToCrop(result);
                            setLastUploadedImage(result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Select a new profile picture to upload.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Updating...' : 'Update profile'}
          </Button>
        </form>
      </Form>
      {imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          onCropComplete={(croppedImage) => {
            setAvatar(croppedImage);
            setImageToCrop(null);
          }}
          onCancel={() => setImageToCrop(null)}
        />
      )}
    </>
  );
}
