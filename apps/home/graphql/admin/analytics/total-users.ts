import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const ANALYTICS_TOTAL_USERS_QUERY = /* GraphQL */ `
  {
    analyticsTotalUsers
  }
`

const useAnalyticsTotalUsers = () => {
  const result = useSWR(
    [ANALYTICS_TOTAL_USERS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useAnalyticsTotalUsers