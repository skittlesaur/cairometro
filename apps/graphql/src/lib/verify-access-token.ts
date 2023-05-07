import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev'

const verifyAccessToken = async (token: string, prisma: PrismaClient) => {
  const verify = jwt.verify(token, JWT_SECRET)
  const { id } = verify as { id: string }

  if (!id) throw new Error('User id not found')

  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export default verifyAccessToken