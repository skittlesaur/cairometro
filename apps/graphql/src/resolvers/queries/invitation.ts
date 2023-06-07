import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'

const invitation: FieldResolver<'Query', 'invitation'> =
  async (_, args, ctx: Context) => {
    const { prisma } = ctx
    const { token } = args
    
    const invitation = await prisma.staffInvitation.findUnique({
      where: {
        id: token,
      },
    })

    if (!invitation) {
      throw new Error('Invitation not found.')
    }

    return invitation
  }

export default invitation