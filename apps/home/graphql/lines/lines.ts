import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const LINES_QUERY = /* GraphQL */ `
  {
    lines {
      id
      name
      name_ar
      stations {
        id
        name
        name_ar
        location
        locationLngLat {
          lng
          lat
        }
      }
   }
  }
`

const useLines = () => {
  const result = useSWR(
    [LINES_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr),
  )

  return result
}

export default useLines