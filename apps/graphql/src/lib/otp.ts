import otpGenerator from 'otp-generator';
import date from 'date-and-time';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const generateOtp = async (email: string) => {
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
          userEmail: email,
          createdAt: now,
          expiryDate: date.addMinutes(now, 30)
        }
          
      });

      console.log(otpCode);
};

generateOtp("momenyasser@gmail.com");

