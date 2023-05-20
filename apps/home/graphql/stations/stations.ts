import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const USER_QUERY = /* GraphQL */ `
  {
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
`

const useStations = () => {
  const result = useSWR(
    [USER_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr),
  )

  return result
}

export default useStations