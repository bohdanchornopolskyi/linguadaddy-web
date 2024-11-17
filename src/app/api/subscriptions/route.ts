import { EVENT_TYPE } from '@/lib/constants';
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

    const signature = (await headers()).get('Paddle-Signature') as string;

    if (!signature) {
      return Response.json({ error: 'Missing Paddle signature' });
    }

    if (!request.body) {
      return Response.json({ error: 'Missing request body' });
    }

    const eventData = paddle.webhooks.unmarshal(
      request.body.toString(),
      env.PADDLE_PUBLIC_KEY,
      signature
    );

    if (!eventData) {
      return Response.json({ error: 'Invalid event data' });
    }

    switch (eventData.eventType) {
      case EventName.SubscriptionCreated:
        console.log('Subscription created');
        break;
      case EventName.SubscriptionUpdated:
        console.log('Subscription updated');
        break;
      case EventName.SubscriptionCancelled:
        console.log('Subscription cancelled');
        break;
      default:
        console.log('default');
    }

    const body = await request.json();

    return Response.json({ message: 'Hello, world!' });
  } catch (error) {
    if (error instanceof PublicError) {
      return Response.json({ error: error.message });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
