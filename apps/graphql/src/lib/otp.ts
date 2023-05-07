import { PrismaClient, User } from '@prisma/client'
import date from 'date-and-time'
import otpGenerator from 'otp-generator'

const generateOTP = async (user: {id: string} & Partial<User>, prisma: PrismaClient) => {
  let otpCode, existingOtp

  // make sure the otp code is unique
  do {
    otpCode = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    // eslint-disable-next-line no-await-in-loop
    existingOtp = await prisma.otp.findUnique({
      where: { code: otpCode },
    })
  } while (existingOtp !== null)

  const now = new Date()

  const otp = await prisma.otp.create({
    data: {
      code: otpCode,
      createdAt: now,
      expiryDate: date.addMinutes(now, 30),
      userId: user.id,
    },

  })

  return otp
}

export default generateOTP