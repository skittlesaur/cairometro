import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../../context'
import adminPermission from '../../../permissions/admin'

const analyticsTotalUsers: FieldResolver<'Query', 'analyticsTotalUsers'> =
  async (_, _args, ctx: Context) => {
    adminPermission(ctx)
    return await ctx.prisma.user.count()
  }

export default analyticsTotalUsers