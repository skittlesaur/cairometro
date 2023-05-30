import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

export interface AddLineVariables extends Variables {
  name: string
  name_ar: string
  color: string
  priceZoneOne: number
  priceZoneOneSeniors: number
  priceZoneTwo: number
  priceZoneTwoSeniors: number
  priceZoneThree: number
  priceZoneThreeSeniors: number
}

const ADD_LINE_QUERY = /* GraphQL */ `
  mutation adminAddLine(
    $name: String!
    $name_ar: String!
    $color: String!
    $priceZoneOne: Float!
    $priceZoneOneSeniors: Float!
    $priceZoneTwo: Float!
    $priceZoneTwoSeniors: Float!
    $priceZoneThree: Float!
    $priceZoneThreeSeniors: Float!
  ) {
    adminAddLine(
      name: $name
      name_ar: $name_ar
      color: $color
      priceZoneOne: $priceZoneOne
      priceZoneOneSeniors: $priceZoneOneSeniors
      priceZoneTwo: $priceZoneTwo
      priceZoneTwoSeniors: $priceZoneTwoSeniors
      priceZoneThree: $priceZoneThree
      priceZoneThreeSeniors: $priceZoneThreeSeniors
    ) {
      id
      name
      name_ar
    }
  }
`

const adminAddLineMutation = (variables: AddLineVariables) => {
  return mutate(ADD_LINE_QUERY, variables)
}

export default adminAddLineMutation