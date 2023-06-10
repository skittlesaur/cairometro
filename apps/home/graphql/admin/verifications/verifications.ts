import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

interface VerificationVariables extends Variables {
  page: number
  take?: number
}

const VERIFICATION_QUERY = /* GraphQL */ `
query ($page: Int!, $take: Int){
    adminGetVerificationRequests(page: $page, take: $take) {
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