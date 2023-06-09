import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface UpdateInvitationVariables extends Variables {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cardCvc: string
  saveCard: boolean
  metaData: {
    from: string,
    to: string,
    passengers: {
      adults: number,
      seniors: number,
      children: number
    },
    departureTime: string,
  }
}

const CREATE_PAYMENT_QUERY = /* GraphQL */ `
  mutation createPayment(
    $cardNumber: String!
    $expiryMonth: String!
    $expiryYear: String!
    $cardCvc: String!
    $saveCard: Boolean!
    $metaData: oneTimeInput!
  ) {
    createPayment(
      cardNumber: $cardNumber
      expiryMonth: $expiryMonth
      expiryYear: $expiryYear
      cardCvc: $cardCvc
      saveCard: $saveCard
      metaData: $metaData
    )
  }
`

const createPaymentMutation = (variables: UpdateInvitationVariables) => {
  return mutate(CREATE_PAYMENT_QUERY, variables)
}

export default createPaymentMutation