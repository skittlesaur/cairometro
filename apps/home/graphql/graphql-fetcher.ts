import { GraphQLClient, Variables } from 'graphql-request'

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1111'

const graphqlUrl = `${DEFAULT_API_URL}/graphql`

const graphQLClient = new GraphQLClient(graphqlUrl, {
  credentials: 'include',
  mode: 'cors',
})

const graphqlFetcher = (query: string | string[], variables?: Variables) => {
  const queryString = Array.isArray(query) ? query[0] : query
  const queryName = queryString.split('{')[1].split('(')[0].split('}')[0].replace('\n', '').trim()

  return graphQLClient.request(queryString, variables)
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    .then((res: any) => {
      return res[queryName]
    })
    .catch((err) => {
      throw err.response.errors
    })
}

export default graphqlFetcher