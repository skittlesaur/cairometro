import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

export interface UpdateRefundRequestVariables extends Variables {
  refundRequestId: string,
  status: {
    refundStatus: 'ACCEPTED' | 'REJECTED'
   }
}

const UPDATE_REFUND_REQUEST_MUTATION = /* GraphQL */ `
  mutation adminUpdateRefundRequest($refundRequestId: String!, $status: RefundStatusEnumArg!) {
    adminUpdateRefundRequest(refundRequestId: $refundRequestId, status: $status)
  }
`

const updateRefundRequestMutation = (variables: UpdateRefundRequestVariables) => {
  return mutate(UPDATE_REFUND_REQUEST_MUTATION, variables)
}

export default updateRefundRequestMutation