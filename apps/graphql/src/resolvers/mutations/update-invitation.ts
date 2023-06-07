import { FieldResolver } from 'nexus'

import { Context } from '../../context'
import capitalizeFirstLetters from '../../lib/capitalize-first-letters'
import sendEmail, { EmailTemplate } from '../../lib/send-email'

const updateInvitation: FieldResolver<'Mutation', 'updateInvitation'> = async (
  _, args, ctx: Context,
) => {
  const { prisma } = ctx
  const { token, status } = args
  
  const invitation = await prisma.staffInvitation.findUnique({
    where: {
      id: token,
    },
    include: {
      invitedBy: true,
    },
  })
  
  if (!invitation) {
    throw new Error('Invitation not found.')
  }
  
  if (status === 'ACCEPTED') {
    await prisma.user.upsert({
      where: {
        email: invitation.email,
      },
      update: {
        role: invitation.role,
      },
      create: {
        email: invitation.email,
        name: invitation.name,
        role: invitation.role,
      },
    })
  }

  await sendEmail<EmailTemplate.INVITATION_RESPONSE>(
    invitation.invitedBy.email,
    `Your invitation to ${invitation.name} has been ${status.toLowerCase()}`,
    EmailTemplate.INVITATION_RESPONSE,
    {
      name: invitation.name,
      email: invitation.email,
      status: status.toLowerCase(),
      role: capitalizeFirstLetters(invitation.role.replace('_', ' ')),
    }
  )

  await prisma.staffInvitation.delete({
    where: {
      id: token,
    },
  })

  return true
}


export default updateInvitation