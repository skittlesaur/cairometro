import { GraphQLError } from 'graphql/error'

import { UserRole } from '@prisma/client'

import { Context } from '../context'

import authenticatedPermission from './authenticated'

const adminPermission = async (ctx: Context) => {
  authenticatedPermission(ctx)
  
  if (ctx.user.role !== UserRole.ADMIN) throw new GraphQLError('Not authorized')

  return true
}

export default adminPermission