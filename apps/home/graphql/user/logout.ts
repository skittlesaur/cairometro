import mutate from '@/graphql/mutate'

const LOGIN_MUTATION = /* GraphQL */ `
mutation {
  logout
}
`

const logoutMutation = async () => {
  return mutate(LOGIN_MUTATION)
}

export default logoutMutation