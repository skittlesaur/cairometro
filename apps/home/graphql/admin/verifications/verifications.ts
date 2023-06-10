import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

export interface VerificationVariables extends Variables {
  page: number
  take?: number
  filterBy?: 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED'
  search?: string
}

const VERIFICATION_QUERY = /* GraphQL */ `
query ($page: Int!, $take: Int, $filterBy: String, $search: String) {
    adminGetVerificationRequests(page: $page, take: $take, filterBy: $filterBy, search: $search) {
      id
      name
      email
      role
      documentVerified
      createdAt
      documentUrl
    }
  }
`

const useVerifications = (variables: VerificationVariables) => {
  const result = useSWR(
    [VERIFICATION_QUERY, ...Object.values(variables)],
    (queryStr: string) => graphqlFetcher(queryStr, variables),
  )

  return result
}

export default useVerifications