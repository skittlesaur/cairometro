import { RefundStatus } from '@prisma/client'
import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../../context'
import adminPermission from '../../../permissions/admin'

const analyticsSoldTickets: FieldResolver<'Query', 'analyticsSoldTickets'> =
  async (_, _args, ctx: Context) => {
    adminPermission(ctx)

    const { prisma } = ctx
    
    const refundsPromise = prisma.refund.aggregate({
      where: {
        status: RefundStatus.ACCEPTED,
      },
      _count: true,
    })

    const ticketsPromise = prisma.userTickets.aggregate({
      _count: true,
    })

    const [refunds, tickets] = await Promise.all([refundsPromise, ticketsPromise])

    return tickets._count - refunds._count
  }

export default analyticsSoldTickets