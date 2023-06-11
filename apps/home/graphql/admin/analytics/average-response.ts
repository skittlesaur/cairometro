
import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const TOTAL_SOLD_TICKETS_QUERY = /* GraphQL */ `
  {
    totalSoldTickets
  }
`

const useTotalSoldTickets = () => {
  const result = useSWR(
    [TOTAL_SOLD_TICKETS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useTotalSoldTickets