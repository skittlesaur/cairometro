import { UserRole } from '@prisma/client'
import { FieldResolver } from 'nexus'

const secretCreateMainAdminAccount: FieldResolver<'Mutation', 'secretCreateMainAdminAccount'> =
  async (_, args, ctx) => {
    const { prisma } = ctx

    await prisma.user.upsert({
      where: {
        email: process.env.MAIN_ADMIN_EMAIL,
      },
      update: {},
      create: {
        email: process.env.MAIN_ADMIN_EMAIL,
        name: 'Admin',
        role: UserRole.ADMIN,
      },
    })

    return true
  }

export default secretCreateMainAdminAccount