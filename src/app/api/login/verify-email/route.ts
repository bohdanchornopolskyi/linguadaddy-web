// import { rateLimitByIp } from '@/lib/limiter';
import { verifyEmail } from '@/actions/users';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  try {
    // TODO: Add rate limiting
    // await rateLimitByIp({ key: 'verify-email', limit: 5, window: 60000 });

    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/sign-in',
        },
      });
    }

    await verifyEmail(token);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/verify-success',
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/sign-in',
      },
    });
  }
}
