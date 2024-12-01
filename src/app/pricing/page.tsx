import { Pricing } from '@/components/pricing/pricing';

export default function PricingPage() {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Pricing country={'US'} />
      </div>
    </div>
  );
}
