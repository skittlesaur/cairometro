import { useState } from 'react'

import SubscriptionCard from '@/components/subscriptions/subscription-card'

import cn from 'classnames'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next'

const Subscriptions = () => {
  const { t } = useTranslation('subscriptions')

  const SubscriptionType = [
    t('types.monthly'), t('types.quarterly'), t('types.annual'),
  ]

  const [activeType, setActiveType] = useState(0)

  const monthly = [
    {
      price: 185,
      area: t('areas.one'),
      stations: t('upToStations').replace('{0}', '9'),
      ridesFor: 3.08,
      insteadOf: 5,
      seniors: 150,
    },
    {
      price: 230,
      area: t('areas.two'),
      stations: t('upToStations').replace('{0}', '16'),
      ridesFor: 3.83,
      insteadOf: 5,
      seniors: 210,
    },
    {
      price: 275,
      area: t('areas.three'),
      stations: t('moreThanStations').replace('{0}', '16'),
      ridesFor: 6,
      insteadOf: 10,
      seniors: 250,
    },
  ]

  const quarterly = [
    {
      price: 500,
      area: t('areas.one'),
      stations: t('upToStations').replace('{0}', '9'),
      ridesFor: 2.77,
      insteadOf: 5,
      seniors: 420,
    },
    {
      price: 630,
      area: t('areas.two'),
      stations: t('upToStations').replace('{0}', '16'),
      ridesFor: 3.50,
      insteadOf: 5,
      seniors: 550,
    },
    {
      price: 760,
      area: t('areas.three'),
      stations: t('moreThanStations').replace('{0}', '16'),
      ridesFor: 4.2,
      insteadOf: 10,
      seniors: 650,
    },
  ]

  const yearly = [
    {
      price: 1800,
      area: t('areas.one'),
      stations: t('upToStations').replace('{0}', '9'),
      ridesFor: 2.50,
      insteadOf: 5,
      seniors: 1500,
    },
    {
      price: 2300,
      area: t('areas.two'),
      stations: t('upToStations').replace('{0}', '16'),
      ridesFor: 3.19,
      insteadOf: 5,
      seniors: 2000,
    },
    {
      price: 2800,
      area: t('areas.three'),
      stations: t('moreThanStations').replace('{0}', '16'),
      ridesFor: 3.88,
      insteadOf: 10,
      seniors: 2500,
    },
  ]

  return (
    <div className="flex flex-col gap-16 md:gap-40 my-16 md:my-40">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-medium tracking-wide text-center">
          {t('title')}
        </h1>
        <p className="text-lg text-center">
          {t('description')}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-3 flex items-center justify-center gap-2">
          {SubscriptionType.map((type) => (
            <button
              key={type}
              className={cn(
                'text-sm font-medium py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-50',
                {
                  'bg-primary text-white': SubscriptionType[activeType] === type,
                },
              )}
              onClick={() => setActiveType(
                SubscriptionType.findIndex((t) => t === type),
              )}
            >
              {type}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {activeType === 0 && monthly.map((card, index) => (
            <SubscriptionCard
              key={`${activeType}-${card.area}}`}
              index={index}
              price={card.price}
              area={card.area}
              stations={card.stations}
              subscription={SubscriptionType[activeType]}
              benefits={[
                t('benefits.rides')
                  .replace('{0}', card.ridesFor.toString())
                  .replace('{1}', card.insteadOf.toString())
                  .replace('{2}', `${Math.round((1 - card.ridesFor / card.insteadOf) * 100)}%`),
                t('benefits.customerPriority'),
                t('benefits.seniors')
                  .replace('{0}', card.seniors.toString()),
              ]}
            />
          ))}
          {activeType === 1 && quarterly.map((card, index) => (
            <SubscriptionCard
              key={`${activeType}-${card.area}}`}
              index={index}
              price={card.price}
              area={card.area}
              stations={card.stations}
              subscription={SubscriptionType[activeType]}
              benefits={[
                t('benefits.rides')
                  .replace('{0}', card.ridesFor.toString())
                  .replace('{1}', card.insteadOf.toString())
                  .replace('{2}', `${Math.round((1 - card.ridesFor / card.insteadOf) * 100)}%`),
                t('benefits.customerPriority'),
                t('benefits.seniors')
                  .replace('{0}', card.seniors.toString()),
              ]}
            />
          ))}
          {activeType === 2 && yearly.map((card, index) => (
            <SubscriptionCard
              key={`${activeType}-${card.area}}`}
              index={index}
              price={card.price}
              area={card.area}
              stations={card.stations}
              subscription={SubscriptionType[activeType]}
              benefits={[
                t('benefits.rides')
                  .replace('{0}', card.ridesFor.toString())
                  .replace('{1}', card.insteadOf.toString())
                  .replace('{2}', `${Math.round((1 - card.ridesFor / card.insteadOf) * 100)}%`),
                t('benefits.customerPriority'),
                t('benefits.seniors')
                  .replace('{0}', card.seniors.toString()),
              ]}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Subscriptions