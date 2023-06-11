import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import adminPermission from '../../permissions/admin'

const monthlyRevenue: FieldResolver<'Query', 'monthlyRevenue'> =
  async (_, args, ctx: Context) => {
    adminPermission(ctx)

    const now = new Date()
    const year = now.getFullYear()

    const months = Array.from({ length: 12 }, (_, i) => i + 1)
    
    const monthlyRevenue = await Promise.all(
      months.map(async month => {
        const start = new Date(year, month - 1, 1)
        const end = new Date(year, month, 0)

        const revenue = await ctx.prisma.userTickets.aggregate({
          _sum: {
            price: true,
          },
          where: {
            createdAt: {
              gte: start,
              lte: end,
            },
          },
        })

        return {
          month,
          revenue: revenue._sum.price || 0,
        }
      })
    )
    
    return monthlyRevenue
  }

export default monthlyRevenue