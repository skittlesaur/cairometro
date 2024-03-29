import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

interface ScheduleVariables extends Variables {
  from: string
  to: string
  take: number
  page: number
  date: string
  passengers: {
    adults: number
    children: number
    seniors: number
  }
  travelTime?: {
    hour: number
    minute: number
    meridiem: 'am' | 'pm'
  }
}

const SCHEDULE_QUERY = /* GraphQL */ `
query paginateStationsSchedule (
  $from: String!
  $to: String!
  $take: Int!
  $page: Int!
  $passengers: passengersInputType!
  $travelTime: scheduleTimeType
  $date: String!
) {
  paginateStationsSchedule(
    from: $from
    to: $to
    take: $take
    page: $page
    date: $date
    passengers: $passengers
    travelTime: $travelTime
  ) {
    from {
      id
      name
      name_ar
    }
    to {
      id
      name
      name_ar
    }
    noOfStationsOnPath
    schedule {
      departureTime
      arrivalTime
    }
    price
  }
}
`

const useSchedule = (variables: ScheduleVariables) => {
  const result = useSWR(
    [SCHEDULE_QUERY, variables],
    (query: string) => graphqlFetcher(query, variables),
  )

  return result
}

export default useSchedule