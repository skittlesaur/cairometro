import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

interface InvitationVariables extends Variables {
  token: string
}

const GET_INVITATION_QUERY = /* GraphQL */ `
  query getInvitation($token: String!) {
    getInvitation(token: $token) {
      id
      name
      email
      role
      createdAt
      invitedBy {
        id
        name
        email
      }
    }
  }
`

const useGetInvitation = (variables: InvitationVariables) => {
  const result = useSWR(
    [GET_INVITATION_QUERY, variables],
    (queryStr: string) => graphqlFetcher(queryStr, variables),
  )

  return result
}

export default useGetInvitation