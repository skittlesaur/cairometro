import Ticket from '@/components/ticket'

import { useTranslation } from 'next-i18next'

const Discover = () => {
  const { t } = useTranslation('home')
  
  return (
    <div className="w-full flex flex-col items-center gap-16">
      <div className="flex flex-col gap-2 text-left md:text-center">
        <h1 className="text-5xl font-semibold">
          {t('discover.title')}
        </h1>
        <h2 className="text-xl text-neutral-400">
          {t('discover.subtitle')}
        </h2>
      </div>
      <div className="w-full flex flex-col gap-5">
        <Ticket
          departure="Sadat"
          arrival="Maadi"
          arrivalTime={new Date()}
          departureTime={new Date()}
          href="#"
          price={5}
          stations={7}
        />
      </div>
    </div>
  )
}

export default Discover