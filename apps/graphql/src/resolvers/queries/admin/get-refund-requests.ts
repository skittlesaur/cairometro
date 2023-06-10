import Fuse from 'fuse.js'
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
  const search = args.search ?? ''

  if (!search){
    const refundRequests = await prisma.refund.findMany({
      skip: args.page * take,
      take: take,
      where: filterBy !== 'ALL' ? { status: filterBy } : {},
    })

    return refundRequests
  }

  const requests = await prisma.refund.findMany({
    include: {
      user: true,
    },
  })

  const fuse = new Fuse(requests, {
    isCaseSensitive: false,
    keys: ['user.name', 'user.email', 'message'],
  })
  
  const result = fuse.search(search)

  if (filterBy === 'ALL'){
    return result.map((request) => request.item)
  }

  return result
    .filter((request) => request.item.status === filterBy)
    .map((request) => request.item)
}

export default getRefundRequests
