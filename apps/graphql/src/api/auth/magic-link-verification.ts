import { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

import generateAccessToken from '../../lib/generate-access-token'
import { isDev } from '../../utils/is-dev'

const magicLinkVerification = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient()
    const { link } = req.body
    
    const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? ''

    const magicLink = await prisma.magicToken.findUnique({
      where: {
        id: link,
      },
      select: {
        id: true,
        expiryDate: true,
        userID: true,
      },
    })

    if (!magicLink) {
      return res.status(400).json({
        message: 'Magic link does not exist',
      })
    }

    const expiryDate = magicLink?.expiryDate as Date
    const userID = magicLink?.userID as string

    if (expiryDate < new Date()) {
      return res.status(400).json({
        message: 'Link is expired, please try again',
      })
    }

    const token = generateAccessToken({ id: userID })

    await res.cookie('access', token, {
      domain: accessTokenCookieDomain,
      httpOnly: true,
      secure: !isDev,
    })

    // await prisma.magicToken.delete({
    //   where: {
    //     id: magicLink.id,
    //   },
    // })

    return res.status(200).json({
      success: true,
    })
  } catch (e) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export default magicLinkVerification