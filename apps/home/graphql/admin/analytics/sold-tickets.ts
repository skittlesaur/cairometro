import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const ANALYTICS_SOLD_TICKETS_QUERY = /* GraphQL */ `
  {
    analyticsSoldTickets
  }
`

const useAnalyticsSoldTickets = () => {
  const result = useSWR(
    [ANALYTICS_SOLD_TICKETS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useAnalyticsSoldTickets