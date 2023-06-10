import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const SENIORS_ANALYTICS_QUERY = /* GraphQL */ `
  query seniorsAnalytics {
    seniorsAnalytics {
      total
      totalApproved
      totalRejected
      totalThisMonth
    }
  }
`

const useSeniorsAnalytics = () => {
  const result = useSWR(
    [SENIORS_ANALYTICS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useSeniorsAnalytics