import { eq } from 'drizzle-orm';
import { database } from '@/db';
import { Subscription, subscriptions } from '@/db/schema';

export async function createSubscription(subscription: Subscription) {
  await database.insert(subscriptions).values(subscription);
}

export async function getSubscriptionByUserId(userId: string) {
  return database.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });
}

export async function updateSubscription(subscription: Subscription) {
  await database
    .update(subscriptions)
    .set(subscription)
    .where(eq(subscriptions.subscriptionId, subscription.subscriptionId));
}
