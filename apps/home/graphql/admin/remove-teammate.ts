import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface AdminRemoveTeammateVariables extends Variables {
  email: string
}

const ADMIN_REMOVE_TEAMMATES_QUERY = /* GraphQL */ `
mutation adminRemoveTeammate($email: String!) {
  adminRemoveTeammate(email: $email)
}
`

const adminRemoveTeammateMutation = (variables: AdminRemoveTeammateVariables) => {
  return mutate(ADMIN_REMOVE_TEAMMATES_QUERY, variables)
}

export default adminRemoveTeammateMutation