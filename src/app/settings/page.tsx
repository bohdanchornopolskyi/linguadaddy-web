import { Separator } from '@/components/ui/separator';
import { ProfileForm } from '@/components/settings/profile-form';
import { PasswordForm } from '@/components/settings/password-form';
import { assertAuthenticated } from '@/lib/session';
import { getProfile } from '@/data-access/profiles';
import { getAccountByUserId } from '@/data-access/accounts';

export default async function SettingsPage() {
  const user = await assertAuthenticated();
  const profile = await getProfile(user.id);
  const account = await getAccountByUserId(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator />
      <ProfileForm
        image={profile.image ?? ''}
        displayName={profile.displayName ?? ''}
      />
      {account.accountType === 'email' && (
        <>
          <Separator />
          <PasswordForm />
        </>
      )}
    </div>
  );
}
