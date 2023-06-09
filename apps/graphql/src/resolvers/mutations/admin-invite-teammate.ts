import { GraphQLError } from 'graphql/error'

import { UserRole } from '@prisma/client'
import { FieldResolver } from 'nexus'

import { Context } from '../../context'
import capitalizeFirstLetters from '../../lib/capitalize-first-letters'
import sendEmail, { EmailTemplate } from '../../lib/send-email'

const adminInviteTeammate: FieldResolver<'Mutation', 'adminInviteTeammate'> =
  async (_, args, ctx: Context) => {
    const { prisma, user } = ctx
    const { name, email, role } = args
    
    const userExists = await prisma.user.findFirst({
      where: {
        email,
        role: {
          in: [UserRole.ADMIN, UserRole.CUSTOMER_SUPPORT],
        },
      },
    })
    
    if (userExists) {
      throw new GraphQLError('User already a team member')
    }
    
    const invite = await prisma.staffInvitation.findUnique({
      where: {
        email,
      },
    })
    
    if (invite) {
      throw new GraphQLError('Invitation already exists')
    }
    
    const invitation = await prisma.staffInvitation.create({
      data: {
        name,
        email,
        role: role.userRole,
        invitedBy: {
          connect: {
            id: user?.id,
          },
        },
      },
    })

    await sendEmail<EmailTemplate.INVITATION>(
      email,
      'You have been invited to join Cairo Metro',
      EmailTemplate.INVITATION,
      {
        name,
        role: capitalizeFirstLetters(invitation.role.replace('_', ' ')),
        link: `${process.env.FRONTEND_URL}/invitation/${invitation.id}`,
      }
    )

    return true
  }

export default adminInviteTeammate