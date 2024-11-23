import { CheckoutHeader } from '@/components/checkout/checkout-header';
import { CheckoutContents } from '@/components/checkout/checkout-contents';
import { assertAuthenticated } from '@/lib/session';

export default async function CheckoutPage() {
  const user = await assertAuthenticated();
  return (
    <div className={'w-full min-h-screen relative overflow-hidden'}>
      <div
        className={
          'mx-auto max-w-6xl relative px-[16px] md:px-[32px] py-[24px] flex flex-col gap-6 justify-between'
        }
      >
        <CheckoutHeader />
        <CheckoutContents userEmail={user?.email} />
      </div>
    </div>
  );
}
