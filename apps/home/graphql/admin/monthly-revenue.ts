import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const MONTHLY_REVENUE_QUERY = /* GraphQL */ `
  query monthlyRevenue {
    monthlyRevenue {
      month
      revenue
    }
  }
`

const useMonthlyRevenue = () => {
  const result = useSWR(
    [MONTHLY_REVENUE_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr),
  )

  return result
}

export default useMonthlyRevenue