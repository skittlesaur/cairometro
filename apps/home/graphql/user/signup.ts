import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface SignUpMutationVariables extends Variables {
  userRole: {
    userRole: 'ADULT' | 'SENIOR'
  }
  email: string
  name: string
  documentUrl?: string
}

const SIGNUP_MUTATION = /* GraphQL */ `
mutation signUp($userRole: UserRoleEnumArg!, $email: String!, $name: String!, $documentUrl: String) {
  signUp(userRole: $userRole, email: $email, name: $name, documentUrl: $documentUrl) {
    id
  }
}
`

const signupMutation = async (variables: SignUpMutationVariables) => {
  return mutate(SIGNUP_MUTATION, variables)
}

export default signupMutation