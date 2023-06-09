import { FieldResolver } from 'nexus'

import { Context } from '../../../context'
import adminPermission from '../../../permissions/admin'

const getRefundRequests: FieldResolver<'Query', 'getRefundRequests'> = async (
  _, args, ctx: Context,
) => {
  adminPermission(ctx)
  const { prisma } = ctx

  const take = args.take ?? 1
  const filterBy = args.filterBy ?? ''

  const refundRequests = await prisma.refund.findMany({
    skip: args.page * take,
    take: take,
    where: filterBy !== 'ALL' ? { status: filterBy } : {},
  })

  return refundRequests
}

export default getRefundRequests
