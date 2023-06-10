import { UserRole, VerificationStatus } from '@prisma/client'
import { FieldResolver } from 'nexus'

import { Context } from '../../../context'
import adminPermission from '../../../permissions/admin'

const totalSeniorRequests = async (ctx: Context) => {
  const { prisma } = ctx
  return await prisma.user.count({
    where: {
      role: UserRole.SENIOR,
    },
  })
}

const totalApprovedSeniorRequests = async (ctx: Context) => {
  const { prisma } = ctx
  return await prisma.user.count({
    where: {
      role: UserRole.SENIOR,
      documentVerified: VerificationStatus.ACCEPTED,
    },
  })
}

const totalRejectedSeniorRequests = async (ctx: Context) => {
  const { prisma } = ctx
  return await prisma.user.count({
    where: {
      role: UserRole.SENIOR,
      documentVerified: VerificationStatus.REJECTED,
    },
  })
}

const totalSeniorsThisMonth = async (ctx: Context) => {
  const { prisma } = ctx
  const currentDate = new Date()
  return await prisma.user.count({
    where: {
      role: UserRole.SENIOR,
      createdAt: {
        gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 0),
      },
    },
  })
}

const seniorsAnalytics: FieldResolver<'Query', 'seniorsAnalytics'> = async (
  _, args, ctx,
) => {
  adminPermission(ctx)

  const [
    total,
    totalApproved,
    totalRejected,
    totalThisMonth,
  ] = await Promise.all([
    totalSeniorRequests(ctx),
    totalApprovedSeniorRequests(ctx),
    totalRejectedSeniorRequests(ctx),
    totalSeniorsThisMonth(ctx),
  ])

  return {
    total,
    totalApproved,
    totalRejected,
    totalThisMonth,
  }
}

export default seniorsAnalytics