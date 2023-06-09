import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface AdminInviteTeammateVariables extends Variables {
  email: string
  name: string
  role: {
    userRole: 'ADMIN' | 'CUSTOMER_SUPPORT'
  }
}

const ADMIN_INVITE_TEAMMATE_QUERY = /* GraphQL */ `
mutation adminInviteTeammate($email: String!, $name: String!, $role: UserRoleEnumArg!) {
  adminInviteTeammate(email: $email, name: $name, role: $role)
}
`

const adminInviteTeammateMutation = (variables: AdminInviteTeammateVariables) => {
  return mutate(ADMIN_INVITE_TEAMMATE_QUERY, variables)
}

export default adminInviteTeammateMutation