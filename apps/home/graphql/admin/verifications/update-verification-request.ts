import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

export interface UpdateVerificationRequestVariables extends Variables {
  userId: string,
  documentVerified: {
    verificationstatus: 'ACCEPTED' | 'REJECTED' | 'PENDING'
   }
}

const UPDATE_VERIFICATION_REQUEST_MUTATION = /* GraphQL */ `
  mutation adminUpdateVerificationRequest($userId: String!, $documentVerified: VerificationStatusEnumArg!) {
    adminUpdateVerificationRequest(userId: $userId, documentVerified: $documentVerified)
  }
`

const updateVerificationRequestMutation = (variables: UpdateVerificationRequestVariables) => {
  return mutate(UPDATE_VERIFICATION_REQUEST_MUTATION, variables)
}

export default updateVerificationRequestMutation