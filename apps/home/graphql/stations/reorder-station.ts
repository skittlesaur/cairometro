import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface ReorderStationVariables extends Variables {
  lineId: string
  stationId: string
  newPosition: number
}

const REORDER_QUERY = /* GraphQL */ `
  mutation adminReorderStation($lineId: String!, $stationId: String!, $newPosition: Int!) {
    adminReorderStation(lineId: $lineId, stationId: $stationId, newPosition: $newPosition)
  }
`

const adminReorderStationsMutation = (variables: ReorderStationVariables) => {
  return mutate(REORDER_QUERY, variables)
}

export default adminReorderStationsMutation