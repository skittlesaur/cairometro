import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

interface PurchaseHistoryVariables extends Variables {
  subscriptionOnly?: boolean
}

const PURCHASE_HISTORY_QUERY = /* GraphQL */ `
query purchaseHistory($subscriptionOnly: Boolean) {
  purchaseHistory(subscriptionOnly: $subscriptionOnly) {
    id
    from {
      id
      name
      name_ar
    }
    to {
      id
      name
      name_ar
    }
    price
    date
    adults
    seniors
    children
    refundRequest {
      id
      status
      createdAt
      message
    }
  }
}
`

const usePurchaseHistory = (variables: PurchaseHistoryVariables) => {
  const result = useSWR(
    [PURCHASE_HISTORY_QUERY, variables],
    (queryStr: string) => graphqlFetcher(queryStr, variables)
  )

  return result
}

export default usePurchaseHistory