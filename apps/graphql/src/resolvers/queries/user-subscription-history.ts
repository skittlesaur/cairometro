import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import authenticatedPermission from '../../permissions/authenticated'

const userSubscriptionHistory: FieldResolver<'Query', 'userSubscriptionHistory'> =
  async (_, args, ctx: Context) => {
    authenticatedPermission(ctx)
    
    const subscriptions = await ctx.prisma.subscriptions.findMany({
      where: {
        userId: ctx.user?.id,
      },
    })

    return subscriptions
  }
  
export default userSubscriptionHistory