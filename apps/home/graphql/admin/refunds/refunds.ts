import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

export interface RefundsVariables extends Variables {
  page: number
  take?: number
  filterBy?: 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED'
  search?: string
}

const REFUNDS_QUERY = /* GraphQL */ `
query ($page: Int!, $take: Int, $filterBy: String, $search: String) {
    adminGetRefundRequests(page: $page, take: $take, filterBy: $filterBy, search: $search) {
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