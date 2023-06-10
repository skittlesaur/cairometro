import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const SUBSCRIPTION_HISTORY_QUERY = /* GraphQL */ `
  {
    userSubscriptionsHistory {
      id
      type
      tier
      createdAt
      expiresAt
    }
  }
`

const useSubscriptionHistory = () => {
  const result = useSWR(
    [SUBSCRIPTION_HISTORY_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useSubscriptionHistory