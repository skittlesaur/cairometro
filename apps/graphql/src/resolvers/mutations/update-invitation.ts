import { FieldResolver } from 'nexus'

import { Context } from '../../context'

const updateInvitation: FieldResolver<'Mutation', 'updateInvitation'> = async (
  _, args, ctx: Context,
) => {
  const { prisma } = ctx
  const { token, status } = args
  
  const invitation = await prisma.staffInvitation.findUnique({
    where: {
      id: token,
    },
  })
  
  if (!invitation) {
    throw new Error('Invitation not found.')
  }
  
  if (status === 'ACCEPTED') {
    await prisma.user.create({
      data: {
        email: invitation.email,
        name: invitation.name,
        role: invitation.role,
      },
    })
  }


  await prisma.staffInvitation.delete({
    where: {
      id: token,
    },
  })

  return true
}


export default updateInvitation