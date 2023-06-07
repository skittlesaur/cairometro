import { User } from '@prisma/client'
import { FieldResolver } from 'nexus'

import adminPermission from '../../../permissions/admin'

const pendingInvitations: FieldResolver<'Query', 'pendingInvitations'> = async (
  _, args, ctx,
) => {
  adminPermission(ctx)
  
  const { prisma } = ctx
  
  const invitations = await prisma.staffInvitation.findMany({
    include: {
      invitedBy: true,
    },
  })

  // sort by role, created at, and name
  invitations.sort((a: User, b: User) => {
    if (a.role === b.role) {
      if (a.createdAt === b.createdAt) {
        return a.name.localeCompare(b.name)
      }

      return a.createdAt > b.createdAt ? -1 : 1
    }

    return a.role > b.role ? -1 : 1
  })

  return invitations
}

export default pendingInvitations