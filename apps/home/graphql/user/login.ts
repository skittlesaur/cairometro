import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface LoginMutationVariables extends Variables {
  email: string
}

const LOGIN_MUTATION = /* GraphQL */ `
mutation login($email: String!) {
  login(email: $email)
}
`

const loginMutation = async (variables: LoginMutationVariables) => {
  return mutate(LOGIN_MUTATION, variables)
}

export default loginMutation