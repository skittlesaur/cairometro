import { User, UserRole } from '@prisma/client'
import { FieldResolver } from 'nexus'

import adminPermission from '../../../permissions/admin'

const teamMembers: FieldResolver<'Query', 'teamMembers'> = async (
  _, args, ctx,
) => {
  adminPermission(ctx)
  
  const { prisma } = ctx
  
  const users = await prisma.user.findMany({
    where: {
      role: {
        in: [UserRole.ADMIN, UserRole.CUSTOMER_SUPPORT],
      },
    },
  })

  // sort by role, created at, and name
  users.sort((a: User, b: User) => {
    if (a.role === b.role) {
      if (a.createdAt === b.createdAt) {
        return a.name.localeCompare(b.name)
      }

      return a.createdAt > b.createdAt ? -1 : 1
    }

    return a.role > b.role ? -1 : 1
  })

  return users
}

export default teamMembers