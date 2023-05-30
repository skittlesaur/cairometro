import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

interface RideRoute extends Variables {
  from: string
  to: string
  date: string
}

const RIDE_ROUTE_QUERY = /* GraphQL */ `
  query rideRouteByDate($from: String!, $to: String!, $date: String!) {
    rideRouteByDate(from: $from, to: $to, date: $date) {
      station {
        id
        name
        name_ar
        lines {
          id
        }
      }
      time
    }
  }
`

const useRideRoute = (variables: RideRoute) => {
  const result = useSWR(
    [RIDE_ROUTE_QUERY, variables],
    (queryStr: string) => graphqlFetcher(queryStr, variables),
  )

  return result
}

export default useRideRoute