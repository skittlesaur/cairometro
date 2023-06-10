import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const USER_CARDS_QUERY = /* GraphQL */ `
  {
    userCards {
      id
      cardHolder
      last4
      brand
      expiryMonth
      expiryYear
    }
  }
`

const useUserCards = () => {
  const result = useSWR(
    [USER_CARDS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useUserCards