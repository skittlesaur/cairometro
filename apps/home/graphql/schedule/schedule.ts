import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

interface ScheduleVariables extends Variables {
  from: string
  to: string
  take: number
  page: number
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
) {
  paginateStationsSchedule(
    from: $from
    to: $to
    take: $take
    page: $page
    passengers: $passengers
    travelTime: $travelTime
  ) {
    from {
      id
      name
    }
    to {
      id
      name
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