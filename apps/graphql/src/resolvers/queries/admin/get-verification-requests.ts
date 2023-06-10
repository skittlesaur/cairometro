import { UserRole } from '@prisma/client'
import Fuse from 'fuse.js'
import { FieldResolver } from 'nexus'

import adminPermission from '../../../permissions/admin'

const getVerificationRequests: FieldResolver<'Query', 'getVerificationRequests'> = async (
  _, args, ctx,
) => {
  adminPermission(ctx)

  const { prisma } = ctx

  const take = args.take ?? 1
  const { search } = args
  const filterBy = args.filterBy?.toUpperCase()

  const users = await prisma.user.findMany({
    where: {
      role: {
        in: [UserRole.SENIOR],
      },
      documentVerified: filterBy === 'ALL' ? undefined : filterBy,
    },
    skip: search ? undefined : args.page * take,
    take: search ? undefined : take,
  })
  
  if (!search) {
    return users
  }

  const fuse = new Fuse(users, {
    isCaseSensitive: false,
    keys: ['name',
      'email',
      'role',
      'createdAt',
      'status'],
  })

  const results = fuse.search(search).map((result) => result.item)

  // pagination
  const start = args.page * take
  const end = start + take

  return results.slice(start, end)
}

export default getVerificationRequests 