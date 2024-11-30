import { PricingTier, IBillingFrequency } from '@/lib/constants';
import { PriceAmount } from '@/components/pricing/price-amount';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  loading: boolean;
  frequency: IBillingFrequency;
  priceMap: Record<string, string>;
}

export function PriceCards({ loading, frequency, priceMap }: Props) {
  return (
    <div className="isolate mx-auto grid grid-cols-1 gap-8 lg:mx-0 lg:max-w-3xl lg:grid-cols-2">
      {PricingTier.map((tier) => (
        <Card key={tier.name} className="flex flex-col justify-between">
          <CardHeader className="text-center pb-4">
            <CardTitle className="mb-7">{tier.name}</CardTitle>
            <PriceAmount
              loading={loading}
              tier={tier}
              priceMap={priceMap}
              value={frequency.value}
              priceSuffix={frequency.priceSuffix}
            />
          </CardHeader>
          <CardDescription className="text-center px-6">
            {tier.description}
          </CardDescription>
          <CardContent>
            <ul className={'p-8 flex flex-col gap-4'}>
              {tier.features.map((feature: string) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className={'h-6 w-6 text-muted-foreground'} />
                  <span className={'text-base'}>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="">
            <Button className="w-full" variant={'outline'}>
              <Link href={`/checkout/${tier.priceId[frequency.value]}`}>
                Get started
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
