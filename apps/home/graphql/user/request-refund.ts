import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface RequestRefundVariables extends Variables {
  id: string
  ticketType: {
    ticketType: 'TICKET' | 'SUBSCRIPTION'
  }
}

const REQUEST_REFUND_MUTATION = /* GraphQL */ `
mutation requestRefund($id: String!, $ticketType: TicketTypeEnumArg!) {
  requestRefund(id: $id, ticketType: $ticketType)
}
`

const requestRefundMutation = async (variables: RequestRefundVariables) => {
  return mutate(REQUEST_REFUND_MUTATION, variables)
}

export default requestRefundMutation