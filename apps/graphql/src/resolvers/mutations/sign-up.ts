import { GraphQLError } from 'graphql/error'

import { User } from '@prisma/client'
import { FieldResolver } from 'nexus'

import { Context } from '../../context'
import isEmailValid from '../../lib/is-email-valid'

const signUp: FieldResolver<'Mutation', 'signup'> = async (_, args, ctx: Context): Promise<Partial<User>> => {
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

  // @todo: send authentication email to the user

  return user

}


export default signUp