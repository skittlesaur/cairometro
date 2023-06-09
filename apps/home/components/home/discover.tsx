import Loader from '@/components/loader'
import Ticket from '@/components/ticket'
import useRecommendations from '@/graphql/recommendations'
import Recommendation from '@/types/recommendation'

import { useTranslation } from 'next-i18next'

const Discover = () => {
  const { t, i18n } = useTranslation('home')
  const { data: recommendations, isLoading: recommendationsLoading, error: recommendationsError } = useRecommendations()

  if (recommendationsError)
    return null

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
        {recommendationsLoading && (
          <Loader />
        )}
        {recommendations?.map((recommendation: Recommendation) => (
          <Ticket
            key={`${recommendation.from.id}-${recommendation.to.id}`}
            departure={i18n.language === 'ar' ? recommendation.from.name_ar : recommendation.from.name}
            arrival={i18n.language === 'ar' ? recommendation.to.name_ar : recommendation.to.name}
            departureTime={new Date(recommendation.schedule[0].departureTime)}
            arrivalTime={new Date(recommendation.schedule[0].arrivalTime)}
            href={`/tickets/${recommendation.from.id}/${recommendation.to.id}/${new Date(recommendation.schedule[0].departureTime).getTime()}?adults=${1}&children=${0}&seniors=${0}`}
            price={recommendation.price}
            stations={recommendation.noOfStationsOnPath}
          />
        ))}
      </div>
    </div>
  )
}

export default Discover