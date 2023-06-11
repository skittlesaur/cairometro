import { Request, Response } from 'express'

import { PrismaClient, UserRole } from '@prisma/client'

import generateAccessToken from '../../lib/generate-access-token'
import { isDev } from '../../utils/is-dev'

const googleAuth = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient()
    const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? ''
    const { name, email, picture } = req.body

    let user = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          role: UserRole.ADULT,
          picture,
        },
      })
    }
    
    const token = generateAccessToken({ id: user.id })

    await res.cookie('access', token, {
      domain: accessTokenCookieDomain,
      httpOnly: true,
      secure: !isDev,
    })
    
    return res.status(200).json({
      success: true,
    })
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export default googleAuth