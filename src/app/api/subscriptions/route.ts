import { AuthenticationError, PublicError } from '@/lib/errors';
import { getCurrentUser } from '@/lib/session';
import { headers } from 'next/headers';
import { env } from '@/env';
import { EventName, Paddle } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(env.PADDLE_API_KEY);

export async function POST(request: Request) {
  try {
    // TODO: Validate the user after component is tested
    // const user = await getCurrentUser();
    // if (!user) {
    //   throw new AuthenticationError();
    // }

    const signature = (await headers()).get('Paddle-Signature');
    const rawBody = await request.text();

    if (!signature) {
      return Response.json(
        { error: 'Missing Paddle signature' },
        { status: 400 }
      );
    }

    if (!rawBody) {
      return Response.json({ error: 'Missing request body' }, { status: 400 });
    }

    const eventData = paddle.webhooks.unmarshal(
      rawBody,
      env.PADDLE_SIGNATURE_KEY,
      signature
    );

    if (!eventData) {
      return Response.json({ error: 'Invalid event data' }, { status: 400 });
    }

    switch (eventData.eventType) {
      case EventName.SubscriptionCreated:
        console.log('Subscription created', eventData);
        break;
      case EventName.SubscriptionUpdated:
        console.log('Subscription updated', eventData);
        break;
      case EventName.SubscriptionCanceled:
        console.log('Subscription cancelled', eventData);
        break;
      default:
        console.log('Unhandled event type:', eventData.eventType);
    }

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof PublicError) {
      return Response.json({ error: error.message });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
