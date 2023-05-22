
import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const ANALYTICS_AVERAGE_RESPONSE_QUERY = /* GraphQL */ `
  {
    analyticsAverageCustomerSupportResponse
  }
`

const useAnalyticsAverageCustomerSupportResponse = () => {
  const result = useSWR(
    [ANALYTICS_AVERAGE_RESPONSE_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useAnalyticsAverageCustomerSupportResponse