import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface CreateSubscriptionVariables extends Variables {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cardCvc: string
  saveCard: boolean
  metaData: {
    subscriptionType: 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
    subscriptionTier: 'ONE_AREA' | 'TWO_AREAS' | 'THREE_AREAS'
  }
}

const CREATE_SUBSCRIPTION_QUERY = /* GraphQL */ `
  mutation createSubscription(
    $cardId: String
    $cardHolder: String!
    $cardNumber: String!
    $expiryMonth: String!
    $expiryYear: String!
    $cardCvc: String!
    $saveCard: Boolean!
    $metaData: subscriptionEnumArg!
  ) {
    createSubscription(
      cardHolder : $cardHolder
      cardId: $cardId
      cardNumber: $cardNumber
      expiryMonth: $expiryMonth
      expiryYear: $expiryYear
      cardCvc: $cardCvc
      saveCard: $saveCard
      metaData: $metaData
    )
  }
`

const createSubscriptionMutation = (variables: CreateSubscriptionVariables) => {
  return mutate(CREATE_SUBSCRIPTION_QUERY, variables)
}

export default createSubscriptionMutation