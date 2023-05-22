import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

const STATIONS_QUERY = /* GraphQL */ `
  {
    stations {
      id
      name
      name_ar
      location
      lines {
        id
        name
        name_ar
        color
      }
      stationPositionInLine {
        position
        line {
          id
          name
          name_ar
          color
        }
      }
      locationLngLat {
        lng
        lat
      }
   }
  }
`

const useStations = () => {
  const result = useSWR(
    [STATIONS_QUERY],
    (queryStr: string) => graphqlFetcher(queryStr),
  )

  return result
}

export default useStations