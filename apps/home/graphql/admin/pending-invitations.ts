import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const PENDING_INVITATIONS_QUERY = /* GraphQL */ `
query adminPendingInvitations {
  adminPendingInvitations {
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

const usePendingInvitations = () => {
  const result = useSWR(
    [PENDING_INVITATIONS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr),
  )

  return result
}

export default usePendingInvitations