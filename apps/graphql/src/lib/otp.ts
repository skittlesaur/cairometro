import otpGenerator from 'otp-generator';
import date from 'date-and-time';
import { PrismaClient, User } from '@prisma/client';


const generateOtp = async (user2: User, prisma: PrismaClient) => {
    let otpCode = otpGenerator.generate(4, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});

    let existingOtp = await prisma.otp.findUnique({
      where: {
          code: otpCode
        }
        
      },
    );

      while(existingOtp) {
        otpCode = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
        existingOtp = await prisma.otp.findUnique({
          where: { code: otpCode }
        });
      }

      const now = new Date();

      const otp = await prisma.otp.create({
        data: {
          code: otpCode,
          createdAt: now,
          expiryDate: date.addMinutes(now, 30),
          userId: user2.id
        }
          
      });

      return otp;
};
