import { Variables } from 'graphql-request'

import mutate from '@/graphql/mutate'

interface LinkMutationVariables extends Variables {
  
  link: string
}

const MAGIC_LINK_MUTATION = /* GraphQL */ `
mutation magicLinkVerification($link: String!) {
    magicLinkVerification(link:$link)
}
`

const magicLinkMutation = async (variables: LinkMutationVariables) => {
  return mutate(MAGIC_LINK_MUTATION, variables)
}

export default magicLinkMutation