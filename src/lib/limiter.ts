import { headers } from 'next/headers';
import { PublicError } from '@/lib/errors';

export function getIp() {
  const forwardedFor = headers().get('x-forwarded-for');
  const realIp = headers().get('x-real-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return null;
}

const trackers: Record<
  string,
  {
    count: number;
    expiresAt: number;
  }
> = {};

function pruneTrackers() {
  const now = Date.now();

  for (const key in trackers) {
    if (trackers[key].expiresAt < now) {
      delete trackers[key];
    }
  }
}

setInterval(pruneTrackers, 60 * 1000);

export async function rateLimitByKey({
  key = 'global',
  limit = 1,
  window = 10000,
}: {
  key?: string;
  limit?: number;
  window?: number;
}) {
  const tracker = trackers[key] || { count: 0, expiresAt: 0 };

  if (!trackers[key]) {
    trackers[key] = tracker;
  }

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count += 1;

  if (tracker.count > limit) {
    throw new PublicError('Rate limit exceeded');
  }
}

export async function rateLimitByIp({
  key = 'global',
  limit = 1,
  window = 10000,
}: {
  key?: string;
  limit?: number;
  window?: number;
}) {
  const ip = getIp();

  if (!ip) {
    throw new PublicError('Rate limit exceeded');
  }

  await rateLimitByKey({
    key: `${ip}-${key}`,
    limit,
    window,
  });
}
