import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../../context'
import adminPermission from '../../../permissions/admin'

const analyticsTotalSubscribers: FieldResolver<'Query', 'analyticsTotalSubscribers'> =
  async (_, _args, ctx: Context) => {
    adminPermission(ctx)
    // @todo: implement
    return await ctx.prisma.user.count()
  }

export default analyticsTotalSubscribers