import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

export interface UpdateStationVariables extends Variables {
  stationId: string
  name?: string
  name_ar?: string
  location?: {
    lng: number
    lat: number
  },
  lineIds?: string[]
}

const UPDATE_STATION_QUERY = /* GraphQL */ `
  mutation adminUpdateStation(
    $stationId: String!
    $name: String
    $name_ar: String
    $locationLngLat: LngLatInput
    $lineIds: [String!]
  ) {
    adminUpdateStation(
      stationId: $stationId
      name: $name
      name_ar: $name_ar
      locationLngLat: $locationLngLat
      lineIds: $lineIds
    )
  }
`

const adminUpdateStationMutation = (variables: UpdateStationVariables) => {
  return mutate(UPDATE_STATION_QUERY, variables)
}

export default adminUpdateStationMutation