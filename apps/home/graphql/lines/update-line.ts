import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

export interface UpdateLineVariables extends Variables {
  lineId: string
  name?: string
  name_ar?: string
  color?: string
  priceZoneOne?: number
  priceZoneOneSeniors?: number
  priceZoneTwo?: number
  priceZoneTwoSeniors?: number
  priceZoneThree?: number
  priceZoneThreeSeniors?: number
}

const UPDATE_LINE_QUERY = /* GraphQL */ `
  mutation adminUpdateLine(
    $lineId: String!
    $name: String
    $name_ar: String
    $color: String
    $priceZoneOne: Float
    $priceZoneOneSeniors: Float
    $priceZoneTwo: Float
    $priceZoneTwoSeniors: Float
    $priceZoneThree: Float
    $priceZoneThreeSeniors: Float
  ) {
    adminUpdateLine(
      lineId: $lineId
      name: $name
      name_ar: $name_ar
      color: $color
      priceZoneOne: $priceZoneOne
      priceZoneOneSeniors: $priceZoneOneSeniors
      priceZoneTwo: $priceZoneTwo
      priceZoneTwoSeniors: $priceZoneTwoSeniors
      priceZoneThree: $priceZoneThree
      priceZoneThreeSeniors: $priceZoneThreeSeniors
    )
  }
`

const adminUpdateLineMutation = (variables: UpdateLineVariables) => {
  return mutate(UPDATE_LINE_QUERY, variables)
}

export default adminUpdateLineMutation