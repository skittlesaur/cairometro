import { MouseEvent, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Separator } from '@/components/separator'
import { useAppContext } from '@/context/app-context'
import createSubscriptionMutation from '@/graphql/payment/create-subscription'
import useUser from '@/graphql/user/me'
import CheckmarkIcon from '@/icons/checkmark.svg'

import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

interface CardProps {
  area: string
  stations: string
  price: number
  benefits: string[]
  index?: number
  subscription: string
}

const CountUp = dynamic(() => import('react-countup'), { ssr: false })

const SubscriptionCard = ({
  area, stations, price, benefits, index = 0, subscription,
}: CardProps) => {
  const { data: user } = useUser()
  const { purchaseModal } = useAppContext()
  const { t } = useTranslation('subscriptions')
  const router = useRouter()

  const onButtonClick = useCallback((_: MouseEvent<HTMLButtonElement>) => {
    if (!user){
      router.push('/login?redirect=/subscriptions')
      return
    }
    
    const metaData = {
      subscriptionType: subscription.toUpperCase(),
      subscriptionTier: area.toUpperCase().replace(' ', '_'),
    }
    
    purchaseModal.open({
      title: `${t('purchaseSubscription').replace('{0}', subscription)} (${area})`,
      price,
      metaData,
      mutation: createSubscriptionMutation,
      onSuccess: () => {
        router.push('/user/subscription')
      },
    })
  }, [area,
    price,
    purchaseModal,
    router,
    subscription,
    t,
    user])

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.25,
          duration: 0.5,
        }, 
      }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className="w-full bg-gradient-to-b from-gray-200 via-gray-100 to-gray-100/0 p-[2px] min-h-[32em] rounded-lg"
    >
      <div className="bg-white w-full h-full rounded-lg flex flex-col justify-between items-center px-4 py-10 gap-10">
        <div className="flex flex-col items-center justify-between gap-9">
          <div className="flex flex-col gap-4">
            <p className="flex rtl:flex-row-reverse items-center justify-center gap-1 text-neutral-500 text-sm font-medium text-center">
              <span>
                {subscription}
              </span>
              <span>
                {t('subscription')}
              </span>
            </p>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-medium tracking-wide text-center">
                {area}
              </h1>
              <p className="text-xs font-medium text-neutral-500 text-center">
                {stations}
              </p>
            </div>
            <h2 className="text-xl font-medium tracking-wide text-center">
              <CountUp
                end={price}
                duration={1.5}
                separator=","
              />
              <span> {t('egp')}</span>
            </h2>
          </div>
          <Separator horizontal />
          <div className="flex flex-col gap-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2"
              >
                <CheckmarkIcon className="w-4 h-4 text-primary" />
                <p className="text-sm">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="text-sm font-medium w-full py-2 bg-neutral-800 text-white rounded-full hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 focus:ring-offset-neutral-50"
          onClick={onButtonClick}
        >
          {t('upgrade').replace('{0}', subscription)}
        </button>
      </div>
    </motion.div>
  )
}

export default SubscriptionCard