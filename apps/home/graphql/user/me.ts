import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const USER_QUERY = /* GraphQL */ `
  {
    me {
      id
      name
      role
      subscription {
        id
        type
        tier
        isActive
        expiresAt
        refundRequest
      }
    }
  }
`

const useUser = () => {
  const result = useSWR(
    [USER_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr)
  )

  return result
}

export default useUser