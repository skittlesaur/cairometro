import { useCallback } from 'react'

import SubscriptionHistory from '@/components/user/subscription/history'
import History from '@/components/user/tickets/history'
import useUser from '@/graphql/user/me'
import requestRefundMutation from '@/graphql/user/request-refund'
import capitalizeFirstLetters from '@/lib/capitalize-first-letters'

import toast from 'react-hot-toast'

const Subscription = () => {
  const { data: user } = useUser()

  const onCancelSubscription = useCallback(async (id: string) => {
    try {
      await requestRefundMutation({
        id,
        ticketType: {
          ticketType: 'SUBSCRIPTION',
        },
      })
      
      toast.success('A subscription refund request has been sent to the admin')
    } catch (errors) {
      const error = (errors as {message: string}[])?.[0]?.message || 'Something went wrong'
      toast.error(error)
    }
  }, [])

  return (
    <div className="min-h-[50vh] flex flex-col gap-8 md:gap-16 my-16 md:my-40">
      <h1 className="text-2xl font-bold">
        My Subscriptions
      </h1>
      {user?.subscription?.isActive && (
        <div className="card-outline-gradient lg:w-3/5 mx-auto h-72 rounded-lg overflow-hidden p-[2px]">
          <div className="bg-gradient-to-tl from-neutral-50 to-white w-full h-full rounded-lg flex flex-col gap-4 justify-between p-10">
            <div className="flex flex-col">
              <h1 className="text-2xl">
                {capitalizeFirstLetters(user.subscription.tier.replace('_', ' '))}
              </h1>
              <p className="text-neutral-500">
                {capitalizeFirstLetters(user.subscription.type)} Subscription
              </p>
            </div>
            <p>
              Enjoy exploring and commuting in the streets of Cairo with your monthly subscription to up to 9 stations
              for free.
            </p>
            <div className="flex flex-col text-neutral-500">
              {user.subscription.refundRequest ? (
                <p>
                  A refund has been requested for this subscription at {new Date(user.subscription.refundRequest).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} and is currently being reviewed by an admin
                </p>
              ) : (
                <>
                  <p>
                    Your subscription will expire on {new Date(user.subscription.expiresAt).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </p>
                  <button
                    className="text-sm hover:text-neutral-800 self-start"
                    onClick={() => onCancelSubscription(user.subscription.id)}
                  >
                    Cancel Subscription
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <h2 className="text-2xl">
        Tickets covered by your subscription
      </h2>
      <History subscriptionOnly />
      <h2 className="text-2xl">
        Your Subscriptions History
      </h2>
      <SubscriptionHistory />
      <style jsx>{`
        .card-outline-gradient {
          background: linear-gradient(-45deg, #EA3347 0%, transparent 30% 70%, #f1808c 100%);
        }
      `}
      </style>
    </div>
  )
}

export default Subscription