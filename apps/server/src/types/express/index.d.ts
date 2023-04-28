import { PrismaClient, User } from '@prisma/client'

declare global {
  namespace Express {
    export interface Request {
      prisma: PrismaClient
      user?: User | Partial<User> | null
    }
  }
}

export {}