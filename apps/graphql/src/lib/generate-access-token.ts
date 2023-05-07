import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev'

const generateAccessToken = (user: { id: string } & Partial<User>) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export default generateAccessToken