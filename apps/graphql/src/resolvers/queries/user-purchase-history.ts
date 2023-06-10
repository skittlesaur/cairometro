import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import authenticatedPermission from '../../permissions/authenticated'

const purchaseHistory: FieldResolver<'Query', 'purchaseHistory'> =
  async (_, args, ctx: Context) => {
    authenticatedPermission(ctx)
    const { prisma, user } = ctx

    if (!args.subscriptionOnly) {
      const purchaseHistory = await prisma.userTickets.findMany({
        where: {
          userId: user?.id,
        },
      })

      return purchaseHistory
    }
    
    const lastSubscription = await prisma.subscriptions.findFirst({
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    const purchaseHistory = await prisma.userTickets.findMany({
      where: {
        userId: user?.id,
        price: 0,
        createdAt: {
          gte: lastSubscription?.createdAt,
        },
      },
    })

    return purchaseHistory
  }

export default purchaseHistory
