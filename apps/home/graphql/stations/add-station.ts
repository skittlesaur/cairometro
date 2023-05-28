import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

export interface AddStationVariables extends Variables {
  name: string
  name_ar: string
  location: {
    lng: number
    lat: number
  }
  lineIds: string[]
}

const UPDATE_STATION_QUERY = /* GraphQL */ `
  mutation adminAddStation(
    $name: String!
    $name_ar: String!
    $location: LngLatInput!
    $lineIds: [String!]!
  ) {
    adminAddStation(
      name: $name
      name_ar: $name_ar
      location: $location
      lineIds: $lineIds
    ) {
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
    }
  }
`

const adminAddStationMutation = (variables: AddStationVariables) => {
  return mutate(UPDATE_STATION_QUERY, variables)
}

export default adminAddStationMutation