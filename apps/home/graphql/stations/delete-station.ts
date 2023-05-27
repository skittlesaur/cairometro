import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface DeleteStationVariables extends Variables {
  stationId: string
}

const DELETE_QUERY = /* GraphQL */ `
  mutation adminDeleteStation($stationId: String!) {
    adminDeleteStation(stationId: $stationId)
  }
`

const adminDeleteStationMutation = (variables: DeleteStationVariables) => {
  return mutate(DELETE_QUERY, variables)
}

export default adminDeleteStationMutation