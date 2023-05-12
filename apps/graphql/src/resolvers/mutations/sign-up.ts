import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

import { Context } from '../../context'
import isEmailValid from '../../lib/is-email-valid'
import generateMagicLink from '../../lib/magic-link'
import generateOTP from '../../lib/otp'
import sendEmail, { EmailTemplate } from '../../lib/send-email'

const signUp: FieldResolver<'Mutation', 'signup'> = async (_, args, ctx: Context) => {
  const { prisma } = ctx

  const checkIfUserExists = await prisma.user.findUnique({
    where: {
      email: args.email,
    },
  })

  if (checkIfUserExists)
    throw new GraphQLError('Email is already registered, please login instead')

  if (!isEmailValid(args.email))
    throw new GraphQLError('The email address you entered is not valid, please try another one')

  if (args.userRole.userRole === 'ADMIN')
    throw new GraphQLError('We Caught You ;) GG!!!')

  let user
  const urlRegexPattern = /^https:\/\/res\.cloudinary\.com\/.*\/cairo-metro\/.*\.(png|jpe?g|gif|bmp|svg)$/igm

  if (args.userRole.userRole === 'SENIOR') {

    if (!urlRegexPattern.test(args.documentUrl))
      throw new GraphQLError('ID photo cannot be found, please retry uploading it')

    user = await prisma.user.create({
      data: {
        role: args.userRole.userRole,
        email: args.email,
        name: args.name,
        documentUrl: args.documentUrl,
        documentVerified: false,
      },
    })
  } else {
    user = await prisma.user.create({
      data: {
        role: args.userRole.userRole,
        email: args.email,
        name: args.name,
      },
    })
  }

  const otp = await generateOTP(user, prisma)
  const magicLink = await generateMagicLink(user, prisma)

  try {
    await sendEmail<EmailTemplate.SIGNUP>(
      user.email,
      'Verify your Cairo Metro account',
      EmailTemplate.SIGNUP,
      {
        name: user.name,
        otp: otp.code.split('').map((num) => parseInt(num)),
        magicLink: `${process.env.FRONTEND_URL}/magic-link/${magicLink.id}`,
      }
    )
    return {
      id: user.id,
    }
  } catch (error) {
    throw new GraphQLError('Error sending email, please try again')
  }
}


export default signUp