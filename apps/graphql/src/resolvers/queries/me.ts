import { GraphQLError } from 'graphql/error'

import { User } from '@prisma/client'
import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

const me: FieldResolver<'Query', 'me'> =
  async (_, args, ctx): Promise<Partial<User>> => {
    const user = ctx.user
    if (!user) throw new GraphQLError('Not authenticated')
    return user
  }

export default me