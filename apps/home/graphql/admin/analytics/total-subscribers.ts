import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const ANALYTICS_TOTAL_SUBSCRIBERS_QUERY = /* GraphQL */ `
  {
    analyticsTotalSubscribers
  }
`

const useAnalyticsTotalSubscribers = () => {
  const result = useSWR(
    [ANALYTICS_TOTAL_SUBSCRIBERS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useAnalyticsTotalSubscribers