import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface UpdateInvitationVariables extends Variables {
  token: string
  status: 'ACCEPTED' | 'REJECTED'
}

const UPDATE_INVITATION_QUERY = /* GraphQL */ `
mutation updateInvitation($token: String!, $status: Status!) {
  updateInvitation(token: $token, status: $status)
}
`

const updateInvitationMutation = (variables: UpdateInvitationVariables) => {
  return mutate(UPDATE_INVITATION_QUERY, variables)
}

export default updateInvitationMutation