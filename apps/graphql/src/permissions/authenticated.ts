import { GraphQLError } from 'graphql/error'

import { Context } from '../context'

const authenticatedPermission = (ctx: Context) => {
  if (!ctx.user) throw new GraphQLError('Not authenticated')

  return true
}

export default authenticatedPermission