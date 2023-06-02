import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const REFUNDS_ANALYTICS_QUERY = /* GraphQL */ `
  query refundsAnalytics {
    refundsAnalytics {
      total
      totalApproved
      totalRejected
      totalThisMonth
    }
  }
`

const useRefundsAnalytics = () => {
  const result = useSWR(
    [REFUNDS_ANALYTICS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useRefundsAnalytics