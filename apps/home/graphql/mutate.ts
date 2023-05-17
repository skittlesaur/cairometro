import { GraphQLClient, Variables } from 'graphql-request'

import Cookies from 'js-cookie'

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1111/graphql'

const graphQLClient = new GraphQLClient(DEFAULT_API_URL, {
  credentials: 'include',
  mode: 'cors',
})

const mutate = (mutation: string, variables?: Variables) => {
  const access = Cookies.get('access')
  if (access) graphQLClient.setHeader('x-auth-access', `Bearer ${access}`)

  const queryName = mutation.split('{')[1].split('(')[0].trim()

  return graphQLClient.request(mutation, variables)
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    .then((res: any) => {
      return res[queryName]
    })
    .catch((err) => {
      throw err.response.errors
    })
}

export default mutate