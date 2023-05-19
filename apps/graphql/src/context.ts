import { YogaInitialContext } from 'graphql-yoga'

import { PrismaClient, User } from '@prisma/client'

import authenticateUser from './lib/authenticate-user'

const prisma = new PrismaClient()

export interface Context extends YogaInitialContext {
  prisma: PrismaClient
  user?: User | Partial<User> | null
}

export const createContext = async (initialContext: YogaInitialContext): Promise<Context> => {
  const user = initialContext.request ? await authenticateUser(prisma, initialContext.request) : null
  return {
    ...initialContext,
    prisma,
    user,
  }
}