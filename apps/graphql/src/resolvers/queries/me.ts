import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import authenticatedPermission from '../../permissions/authenticated'

const me: FieldResolver<'Query', 'me'> =
  async (_, args, ctx: Context) => {
    try {
      authenticatedPermission(ctx)
      return ctx.user
    } catch (e) {
      return null
    }
  }

export default me