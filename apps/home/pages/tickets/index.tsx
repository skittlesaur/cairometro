import Tickets from '@/components/tickets/find'
import graphqlFetcher from '@/graphql/graphql-fetcher'
import { STATION_BY_ID_QUERY } from '@/graphql/stations/station-by-id'
import AppLayout from '@/layouts/app'
import Station from '@/types/station'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface TicketsProps {
  departure: Station
  destination: Station
}

const TicketsPage = ({ departure, destination }: TicketsProps) => {
  return (
    <AppLayout
      navigation={{
        variant: 'blur',
        activePath: '/tickets',
      }}
    >
      <Tickets
        departure={departure}
        destination={destination}
      />
    </AppLayout>
  )
}

export const getServerSideProps = async (
  { query, locale }: { query: { departure: string, destination: string }, locale: string },
) => {
  const { departure, destination } = query

  let depStation, destStation
  try {
    depStation = await graphqlFetcher([STATION_BY_ID_QUERY], { id: departure })
    destStation = await graphqlFetcher([STATION_BY_ID_QUERY], { id: destination })
  } catch (error) {
    // @todo: error handling
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'find-ticket'])),
      departure: depStation,
      destination: destStation,
    },
  }
}

export default TicketsPage