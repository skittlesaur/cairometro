import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const PURCHASE_HISTORY_QUERY = /* GraphQL */ `
{
  purchaseHistory {
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
    refundRequest {
      id
      status
      createdAt
      message
    }
  }
}
`

const usePurchaseHistory = () => {
  const result = useSWR(
    [PURCHASE_HISTORY_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default usePurchaseHistory