import { NextFunction, Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const decodeUserId = (token: string): string => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as { id?: string, userId?: string, user_id?: string }
  const userId = decoded.id ?? decoded.userId ?? decoded.user_id
  if (!userId) throw new Error('No user id found in token')
  return userId
}

const findUser = async (prisma: PrismaClient, userId: string) => {
  return await prisma.user.findUnique({ where: { id: userId } })
}

/**
 * Middleware to authenticate a user based on the JWT token in the request
 */
const authenticatedUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers ?? req.rawHeaders
  const accessToken = headers.authorization?.split(' ')[1] ??
    req.cookies?.access ??
    headers['x-access-token']

  if (!accessToken) {
    return next()
  }

  try {
    const userId = decodeUserId(accessToken)
    req.user = await findUser(req.prisma, userId)
    return next()
  } catch (error) {
    console.error(error)
    return next()
  }
}

export default authenticatedUserMiddleware