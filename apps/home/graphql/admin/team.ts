import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const TEAM_MEMBERS_QUERY = /* GraphQL */ `
query adminTeamMembers {
  adminTeamMembers {
    id
    name
    email
    role
    createdAt
  }
}
`

const useTeamMembers = () => {
  const result = useSWR(
    [TEAM_MEMBERS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr),
  )

  return result
}

export default useTeamMembers