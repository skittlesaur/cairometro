import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import authenticatedPermission from '../../permissions/authenticated'

const me: FieldResolver<'Query', 'me'> =
  async (_, args, ctx: Context) => {
    authenticatedPermission(ctx)
    return ctx.user
  }

export default me