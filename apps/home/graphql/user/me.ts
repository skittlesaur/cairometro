import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const USER_QUERY = /* GraphQL */ `
  {
    me {
      id
      name
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