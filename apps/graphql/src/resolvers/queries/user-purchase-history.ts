import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import authenticatedPermission from '../../permissions/authenticated'

const purchaseHistory: FieldResolver<'Query', 'purchaseHistory'> =
  async (_, args, ctx: Context) => {
    authenticatedPermission(ctx)
    const { prisma, user } = ctx
    
    const purchaseHistory = await prisma.userTickets.findMany({
      where: {
        userId: user?.id,
      },
    })

    return purchaseHistory
  }

export default purchaseHistory
