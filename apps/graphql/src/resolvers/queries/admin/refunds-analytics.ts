import { RefundStatus } from '@prisma/client'
import { FieldResolver } from 'nexus'

import { Context } from '../../../context'
import adminPermission from '../../../permissions/admin'

const totalRefundRequests = async (ctx: Context) => {
  const { prisma } = ctx
  return await prisma.refund.count()
}

const totalApprovedRefundRequests = async (ctx: Context) => {
  const { prisma } = ctx
  return await prisma.refund.count({
    where: {
      status: RefundStatus.ACCEPTED,
    },
  })
}

const totalRejectedRefundRequests = async (ctx: Context) => {
  const { prisma } = ctx
  return await prisma.refund.count({
    where: {
      status: RefundStatus.REJECTED,
    },
  })
}

const totalRefundsThisMonth = async (ctx: Context) => {
  const { prisma } = ctx
  const currentDate = new Date()
  return await prisma.refund.count({
    where: {
      createdAt: {
        gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 0),
      },
    },
  })
}

const refundsAnalytics: FieldResolver<'Query', 'refundsAnalytics'> = async (
  _, args, ctx,
) => {
  adminPermission(ctx)

  const [
    total,
    totalApproved,
    totalRejected,
    totalThisMonth,
  ] = await Promise.all([
    totalRefundRequests(ctx),
    totalApprovedRefundRequests(ctx),
    totalRejectedRefundRequests(ctx),
    totalRefundsThisMonth(ctx),
  ])

  return {
    total,
    totalApproved,
    totalRejected,
    totalThisMonth,
  }
}

export default refundsAnalytics 