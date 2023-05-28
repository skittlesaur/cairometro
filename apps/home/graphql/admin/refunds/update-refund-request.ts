import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface UpdateRefundRequestVariables extends Variables {
  refundRequestId: string,
  status: {
    refundStatus: "ACCEPTED" | "REJECTED"
   }
}

const UPDATE_REFUND_REQUEST_MUTAION = /* GraphQL */ `
  mutation adminUpdateRefundRequest($refundRequestId: String!, $status: RefundStatusEnumArg!) {
        adminUpdateRefundRequest(refundRequestId: $refundRequestId, status: $status)
      }
  
`

const updateRefundRequestMutation = (variables: UpdateRefundRequestVariables) => {
    return mutate(UPDATE_REFUND_REQUEST_MUTAION, variables)
}

export default updateRefundRequestMutation