import { useState } from 'react'

import SubscriptionCard from '@/components/subscriptions/subscription-card'

import cn from 'classnames'
import { AnimatePresence } from 'framer-motion'

enum SubscriptionType {
  MONTHLY = 'Monthly',
  QUARTERLY = 'Quarterly',
  YEARLY = 'Yearly',
}

const Subscriptions = () => {
  const [activeType, setActiveType] = useState<SubscriptionType>(SubscriptionType.MONTHLY)

  const monthly = [
    {
      price: 185,
      area: 'One Area',
      stations: 'Up to 9 stations',
      ridesFor: 3.08,
      insteadOf: 5,
      seniors: 150,
    },
    {
      price: 230,
      area: 'Two Areas',
      stations: 'Up to 16 stations',
      ridesFor: 3.83,
      insteadOf: 5,
      seniors: 210,
    },
    {
      price: 275,
      area: 'Three Areas',
      stations: 'More than 16 stations',
      ridesFor: 6,
      insteadOf: 10,
      seniors: 250,
    },
  ]

  const quarterly = [
    {
      price: 500,
      area: 'One Area',
      stations: 'Up to 9 stations',
      ridesFor: 2.77,
      insteadOf: 5,
      seniors: 420,
    },
    {
      price: 630,
      area: 'Two Areas',
      stations: 'Up to 16 stations',
      ridesFor: 3.50,
      insteadOf: 5,
      seniors: 550,
    },
    {
      price: 760,
      area: 'Three Areas',
      stations: 'More than 16 stations',
      ridesFor: 4.2,
      insteadOf: 10,
      seniors: 650,
    },
  ]

  const yearly = [
    {
      price: 1800,
      area: 'One Area',
      stations: 'Up to 9 stations',
      ridesFor: 2.50,
      insteadOf: 5,
      seniors: 1500,
    },
    {
      price: 2300,
      area: 'Two Areas',
      stations: 'Up to 16 stations',
      ridesFor: 3.19,
      insteadOf: 5,
      seniors: 2000,
    },
    {
      price: 2800,
      area: 'Three Areas',
      stations: 'More than 16 stations',
      ridesFor: 3.88,
      insteadOf: 10,
      seniors: 2500,
    },
  ]
  
  return (
    <div className="flex flex-col gap-16 md:gap-40 my-16 md:my-40">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-medium tracking-wide text-center">
          Subscriptions
        </h1>
        <p className="text-lg text-center">
          Purchase a Cairo Metro monthly, quarterly, or yearly subscription and
          save up to 55%.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-3 flex items-center justify-center gap-2">
          {Object.values(SubscriptionType).map((type) => (
            <button
              key={type}
              className={cn(
                'text-sm font-medium py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-50',
                {
                  'bg-primary text-white': activeType === type,
                }
              )}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {activeType === SubscriptionType.MONTHLY && monthly.map((card, index) => (
            <SubscriptionCard
              key={`${activeType}-${card.area}}`}
              title={`${activeType} Subscription`}
              index={index}
              price={card.price}
              area={card.area}
              stations={card.stations}
              benefits={[
                'Rides for {0} EGP instead of {1} EGP {2}'
                  .replace('{0}', card.ridesFor.toString())
                  .replace('{1}', card.insteadOf.toString())
                  .replace('{2}', `(${Math.round((1 - card.ridesFor / card.insteadOf) * 100)}% off)`),
                'Priority access to customer support',
                '{0} EGP for seniors'
                  .replace('{0}', card.seniors.toString()),
              ]}
            />
          ))}
          {activeType === SubscriptionType.QUARTERLY && quarterly.map((card, index) => (
            <SubscriptionCard
              key={`${activeType}-${card.area}}`}
              title={`${activeType} Subscription`}
              index={index}
              price={card.price}
              area={card.area}
              stations={card.stations}
              benefits={[
                'Rides for {0} EGP instead of {1} EGP {2}'
                  .replace('{0}', card.ridesFor.toString())
                  .replace('{1}', card.insteadOf.toString())
                  .replace('{2}', `(${Math.round((1 - card.ridesFor / card.insteadOf) * 100)}% off)`),
                'Priority access to customer support',
                '{0} EGP for seniors'
                  .replace('{0}', card.seniors.toString()),
              ]}
            />
          ))}
          {activeType === SubscriptionType.YEARLY && yearly.map((card, index) => (
            <SubscriptionCard
              key={`${activeType}-${card.area}}`}
              title={`${activeType} Subscription`}
              index={index}
              price={card.price}
              area={card.area}
              stations={card.stations}
              benefits={[
                'Rides for {0} EGP instead of {1} EGP {2}'
                  .replace('{0}', card.ridesFor.toString())
                  .replace('{1}', card.insteadOf.toString())
                  .replace('{2}', `(${Math.round((1 - card.ridesFor / card.insteadOf) * 100)}% off)`),
                'Priority access to customer support',
                '{0} EGP for seniors'
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