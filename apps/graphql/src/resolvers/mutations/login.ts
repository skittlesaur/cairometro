import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

import generateMagicLink from '../../lib/magic-link'
import generateOTP from '../../lib/otp'
import sendEmail, { EmailTemplate } from '../../lib/send-email'

const login: FieldResolver<'Mutation', 'login'> =
  async (_, args, ctx) => {
    const { email } = args
    const { prisma } = ctx

    if (!email) {
      throw new GraphQLError('Email is required')
    }
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    if (!user) {
      throw new GraphQLError('User not found, please sign up')
    }
    
    const otp = await generateOTP(user, prisma)
    const magicLink = await generateMagicLink(user, prisma)
    
    try {
      await sendEmail<EmailTemplate.LOGIN>(
        user.email,
        'Login to Cairo Metro',
        EmailTemplate.LOGIN,
        {
          name: user.name,
          otp: otp.code.split('').map((num) => parseInt(num)),
          magicLink: `${process.env.FRONTEND_URL}/magic-link/${magicLink.id}`,
        }
      )
      return true
    } catch (error) {
      throw new GraphQLError('Error sending email, please try again')
    }
  }

export default login