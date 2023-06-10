import Loader from '@/components/loader'
import useSubscriptionHistory from '@/graphql/user/subscription-history'

import { useTranslation } from 'next-i18next'

const SubscriptionHistory = () => {
  const { t, i18n } = useTranslation('user-subscriptions')
  const { data: subscriptionHistory, isLoading: subscriptionsLoading } = useSubscriptionHistory()

  return (
    <div>
      <div className="grid grid-cols-[2fr_1fr_1fr] border-b border-neutral-200 pb-2 px-4">
        <p className="font-medium ltr:text-left rtl:text-right">
          {t('subscription')}
        </p>
        <p className="font-medium ltr:text-left rtl:text-right">
          {t('subscribedAt')}
        </p>
        <p className="font-medium ltr:text-left rtl:text-right">
          {t('expirationDate')}
        </p>
      </div>
      {subscriptionsLoading && (
        <div className="mt-7">
          <Loader />
        </div>
      )}
      {subscriptionHistory?.length === 0 && !subscriptionsLoading && (
        <div className="mt-7 flex flex-col">
          <p className="text-center text-neutral-500">
            {t('noSubscriptionsFound')}
          </p>
        </div>
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {subscriptionHistory?.map((subscription: any) => (
        <div
          key={subscription.id}
          className="w-full text-left grid grid-cols-[2fr_1fr_1fr] border-b border-neutral-200 py-3 px-4"
        >
          <p className="ltr:text-left rtl:text-right">
            {t(subscription.tier)} - {t(subscription.type)}
          </p>
          <p className="text-neutral-500 ltr:text-left rtl:text-right">
            {new Date(subscription.createdAt).toLocaleDateString(
              i18n.language === 'ar' ? 'ar-EG' : 'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </p>
          <p className="text-neutral-500 ltr:text-left rtl:text-right">
            {new Date(subscription.expiresAt).toLocaleDateString(
              i18n.language === 'ar' ? 'ar-EG' : 'en-US',
              { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
              })}
          </p>
        </div>
      ))}
    </div>
  )
}

export default SubscriptionHistory