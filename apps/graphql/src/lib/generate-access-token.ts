import { User } from '@prisma/client'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev'

const generateAccessToken = (user: { id: string } & Partial<User>) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export default generateAccessToken