import { Variables } from 'graphql-request'

import graphqlFetcher from '@/graphql/graphql-fetcher'

import useSWR from 'swr'

interface StationByIdVariables extends Variables {
  id: string
}

export const STATION_BY_ID_QUERY = /* GraphQL */ `
  query StationById($id: String!) {
    stationById(id: $id) {
      id
      name
      name_ar
    }
  }
`

const useStationById = (variables: StationByIdVariables) => {
  const result = useSWR(
    [STATION_BY_ID_QUERY, variables],
    (queryStr: string) => graphqlFetcher(queryStr, variables),
  )

  return result
}

export default useStationById