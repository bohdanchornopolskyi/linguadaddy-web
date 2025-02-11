'use client';

import { PriceSection } from '@/components/checkout/price-section';
import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { useTheme } from 'next-themes';

interface PathParams {
  priceId: string;
  [key: string]: string | string[];
}

interface Props {
  userEmail?: string;
}

export function CheckoutContents({ userEmail }: Props) {
  const { theme } = useTheme();
  const { priceId } = useParams<PathParams>();
  const [quantity, setQuantity] = useState<number>(1);
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(
    null
  );

  const handleCheckoutEvents = (event: CheckoutEventsData) => {
    setCheckoutData(event);
  };

  const initializePaddleCheckout = async () => {
    if (
      process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN &&
      process.env.NEXT_PUBLIC_PADDLE_ENV
    ) {
      const paddleInstance = await initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
        eventCallback: (event) => {
          if (event.data && event.name) {
            handleCheckoutEvents(event.data);
          }
        },
        checkout: {
          settings: {
            displayMode: 'inline',
            theme: theme === 'dark' ? 'dark' : 'light',
            allowLogout: !userEmail,
            frameTarget: 'paddle-checkout-frame',
            frameInitialHeight: 450,
            frameStyle:
              'width: 100%; background-color: transparent; border: none',
            successUrl: '/checkout/success',
          },
        },
      });

      if (paddleInstance && priceId) {
        setPaddle(paddleInstance);
        paddleInstance.Checkout.open({
          ...(userEmail && { customer: { email: userEmail } }),
          items: [{ priceId: priceId, quantity: 1 }],
        });
      }
    }
  };

  useEffect(() => {
    if (!paddle?.Initialized) {
      initializePaddleCheckout();
    }
  }, [paddle?.Initialized, priceId, userEmail]);

  // Reinitialize paddle when theme changes
  useEffect(() => {
    if (paddle?.Initialized) {
      initializePaddleCheckout();
    }
  }, [theme]);

  useEffect(() => {
    if (paddle && priceId && paddle.Initialized) {
      paddle.Checkout.updateItems([{ priceId: priceId, quantity: quantity }]);
    }
  }, [paddle, priceId, quantity]);

  return (
    <div
      className={
        'rounded-lg md:bg-background/80 md:backdrop-blur-[24px] md:p-10 md:pl-16 md:pt-16 md:min-h-[400px] flex flex-col justify-between relative'
      }
    >
      <div className={'flex flex-col md:flex-row gap-8 md:gap-16'}>
        <div className={'w-full md:w-[400px]'}>
          <PriceSection
            checkoutData={checkoutData}
            quantity={quantity}
            handleQuantityChange={setQuantity}
          />
        </div>
        <div className={'min-w-[375px] lg:min-w-[535px]'}>
          <div className={'text-base leading-[20px] font-semibold mb-8'}>
            Payment details
          </div>
          <div className={'paddle-checkout-frame'} />
        </div>
      </div>
    </div>
  );
}
