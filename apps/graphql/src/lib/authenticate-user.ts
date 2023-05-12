import { PrismaClient, User } from '@prisma/client'
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

const getAccessToken = (req: Request): string => {
  const authorization = req.headers.get('authorization')?.split(' ')[1]
  if (authorization) return authorization
  
  const cookies = req.headers.get('cookie')
  const formattedCookies = cookies?.split(';').map(cookie => cookie.trim())
  const accessTokenCookie = formattedCookies?.find(cookie => cookie.startsWith('access='))
  const accessToken = accessTokenCookie?.split('=')[1]
  if (accessToken) return accessToken
  
  const xAccessToken = req.headers.get('x-access-token')
  if (xAccessToken) return xAccessToken
  
  throw new Error('No access token found')
}

const authenticateUser = async (prisma: PrismaClient, req: Request): Promise<User | Partial<User> | null> => {
  try {
    const accessToken = getAccessToken(req)
    const userId = decodeUserId(accessToken)
    const user = await findUser(prisma, userId)
    return user
  } catch (error) {
    return null
  }
}

export default authenticateUser