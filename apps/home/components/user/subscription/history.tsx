import Loader from '@/components/loader'
import useSubscriptionHistory from '@/graphql/user/subscription-history'
import capitalizeFirstLetters from '@/lib/capitalize-first-letters'

const SubscriptionHistory = () => {
  const { data: subscriptionHistory, isLoading: subscriptionsLoading } = useSubscriptionHistory()

  return (
    <div>
      <div className="grid grid-cols-[2fr_1fr_1fr] border-b border-neutral-200 pb-2 px-4">
        <p className="font-medium">
          Subscription
        </p>
        <p className="font-medium">
          Subscribed At
        </p>
        <p className="font-medium">
          Expiration Date
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
            No subscriptions found
          </p>
        </div>
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {subscriptionHistory?.map((subscription: any) => (
        <div
          key={subscription.id}
          className="w-full text-left grid grid-cols-[2fr_1fr_1fr] border-b border-neutral-200 py-3 px-4"
        >
          <p>
            {capitalizeFirstLetters(subscription.tier.replace('_', ' '))} - {capitalizeFirstLetters(subscription.type)}
          </p>
          <p className="text-neutral-500">
            {new Date(subscription.createdAt).toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </p>
          <p className="text-neutral-500">
            {new Date(subscription.expiresAt).toLocaleDateString(
              'en-US',
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