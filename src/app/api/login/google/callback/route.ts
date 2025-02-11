import { cookies } from 'next/headers';
import { OAuth2RequestError } from 'arctic';
import { googleAuth } from '@/auth';
import { setSession } from '@/lib/session';
import { createUser } from '@/data-access/users';
import {
  createAccountWithGoogle,
  getAccountByGoogleId,
} from '@/data-access/accounts';
import { createProfile } from '@/data-access/profiles';
import type { Profile } from '@/db/schema';

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState =
    (await cookies()).get('google_oauth_state')?.value ?? null;
  const codeVerifier =
    (await cookies()).get('google_code_verifier')?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await googleAuth.validateAuthorizationCode(
      code,
      codeVerifier
    );
    const response = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await response.json();

    const existingAccount = await getAccountByGoogleId(googleUser.sub);

    if (existingAccount) {
      await setSession(existingAccount.userId);
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/dashboard',
        },
      });
    }

    const user = await createUser(googleUser.email);
    await setSession(user.id);
    await createAccountWithGoogle(user.id, googleUser.sub);
    await createProfile({
      userId: user.id,
      displayName: googleUser.name,
      image: googleUser.picture,
    } as Profile);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard',
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
