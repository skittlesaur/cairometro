import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

import { Context } from '../../context'

const adminRemoveTeammate: FieldResolver<'Mutation', 'adminRemoveTeammate'> =
  async (_, args, ctx: Context) => {
    const { prisma } = ctx
    const { email } = args
    const mainAdminEmail = process.env.MAIN_ADMIN_EMAIL
    
    if (email === mainAdminEmail) {
      throw new GraphQLError('You cannot remove the main admin')
    }
    
    const userByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    
    if (!userByEmail) {
      throw new GraphQLError('User not found')
    }
    
    await prisma.user.delete({
      where: {
        email,
      },
    })

    return true
  }

export default adminRemoveTeammate