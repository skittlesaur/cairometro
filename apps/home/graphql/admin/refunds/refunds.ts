import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const REFUNDS_QUERY = /* GraphQL */ `
query{
    adminGetRefundRequests(page: 0){
      id
      createdAt
      status
      message
      price
      user{
        id
        email
        name
      }
    }
  }
`

const useRefunds = () => {
  const result = useSWR(
    [REFUNDS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr),
  )

  return result
}

export default useRefunds