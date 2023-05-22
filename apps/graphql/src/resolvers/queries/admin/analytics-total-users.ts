import { UserRole } from '@prisma/client'
import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../../context'
import adminPermission from '../../../permissions/admin'

const analyticsTotalUsers: FieldResolver<'Query', 'analyticsTotalUsers'> =
  async (_, _args, ctx: Context) => {
    adminPermission(ctx)
    
    const totalUsers = await ctx.prisma.user.count()
    const totalSeniors = await ctx.prisma.user.count({
      where: {
        role: UserRole.SENIOR,
      },
    })
    const totalAdults = await ctx.prisma.user.count({
      where: {
        role: UserRole.ADULT,
      },
    })
    
    const weeklyUsers = await ctx.prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    })
    
    const lastWeekUsers = await ctx.prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000),
          lte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    })
    
    const monthlyUsers = await ctx.prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    })
    
    const lastMonthUsers = await ctx.prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 60 * 24 * 60 * 60 * 1000),
          lte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    })

    const weeklyUsersDiff = (weeklyUsers - lastWeekUsers) / lastWeekUsers

    const monthlyUsersDiff = (monthlyUsers - lastMonthUsers) / lastMonthUsers

    return {
      totalUsers,
      totalSeniors,
      totalAdults,
      weeklyUsers,
      weeklyUsersDiff: Number.isFinite(weeklyUsersDiff) ? weeklyUsersDiff : 0,
      monthlyUsers,
      monthlyUsersDiff: Number.isFinite(monthlyUsersDiff) ? monthlyUsersDiff : 0,
    }
  }

export default analyticsTotalUsers