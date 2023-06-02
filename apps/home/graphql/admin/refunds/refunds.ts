import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

interface RefundsVariables extends Variables {
  page: number
  take?: number
}

const REFUNDS_QUERY = /* GraphQL */ `
query ($page: Int!, $take: Int){
    adminGetRefundRequests(page: $page, take: $take) {
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

const useRefunds = (variables: RefundsVariables) => {
  const result = useSWR(
    [REFUNDS_QUERY, ...Object.values(variables)],
    (queryStr: string) => graphqlFetcher(queryStr, variables),
  )

  return result
}

export default useRefunds