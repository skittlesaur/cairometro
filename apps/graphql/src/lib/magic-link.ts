import { PrismaClient, User } from '@prisma/client'

const generateMagicLink = async (user: User, prisma: PrismaClient) => {
  const token = await prisma.magicToken.create({
    data: {
      createdAt: new Date(),
      expiryDate: new Date(new Date().getTime() + 30 * 60000), // 30 minutes
      userID: user.id,
    },
  })

  return token  
}

export default generateMagicLink