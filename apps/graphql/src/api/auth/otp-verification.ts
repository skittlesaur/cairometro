import { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

import generateAccessToken from '../../lib/generate-access-token'
import { isDev } from '../../utils/is-dev'

const otpVerification = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient()
    const { code, email } = req.body

    const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? ''
    
    const user = await prisma.user.findFirst({
      where: { 
        email,
      },
    })
    
    if (!user){
      return res.status(400).json({
        message: 'Invalid User',
      })
    }

    const otp = await prisma.otp.findFirst({
      where: {
        code,
        userId: user.id,
      },
    })
    
    if (!otp){
      return res.status(400).json({
        message: 'Invalid OTP',
      })
    }
    
    const expiryDate = otp?.expiryDate as Date
    
    if (expiryDate < new Date()){
      return res.status(400).json({
        message: 'OTP has expired, please try again',
      })
    }
    
    const token = generateAccessToken(user)
    
    await res.cookie('access', token, {
      domain: accessTokenCookieDomain,
      httpOnly: true,
      secure: !isDev,
    })
    
    await prisma.otp.delete({
      where: {
        id: otp.id,
      },
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

export default otpVerification