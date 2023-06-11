import { RefundStatus } from '@prisma/client'
import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../../context'
import adminPermission from '../../../permissions/admin'

const analyticsTotalSoldTickets: FieldResolver<'Query', 'analyticsAverageCustomerSupportResponse'> =
  async (_, _args, ctx: Context) => {
    adminPermission(ctx)

    const { prisma } = ctx
    
    const refundedTickets = await prisma.refund.count({
      where: {
        status: RefundStatus.ACCEPTED,
      },
    })

    const totalSoldTickets = await prisma.userTickets.count()

    const total = totalSoldTickets - refundedTickets

    return total
  }

export default analyticsTotalSoldTickets