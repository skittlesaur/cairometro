import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

import generateAccessToken from '../../lib/generate-access-token'


const otpVerify: FieldResolver< 'Mutation', 'otpVerification'> = 
async (_, args, ctx) =>
{

  
  const { prisma } = ctx
  const { code } = args
  // const accessTokenCookieDomain = process.env.accessTokenCookieDomain

  const otp = await prisma.otp.findUnique({
    where: {
      code: code,
    },
    select: {
      id: true,
      expiryDate: true,
      userId: true,
    },
  })
  if (!otp){
    return false
  }
  const expiryDate = otp?.expiryDate as Date
  const userID = otp?.userID as string
  if (expiryDate < new Date()){
    await prisma.magicToken.delete({
      where: {
        id: otp.id,
      },
    })
    throw new GraphQLError('otp expired please try again')
  }
  const token = generateAccessToken({ id: userID } )
  await ctx.request.cookieStore?.set({
    name: 'access', 
    value: token,
    // domain: accessTokenCookieDomain,
    httpOnly: true,
    expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
  })

  const cookies = await ctx.request.cookieStore.getAll()
  if (cookies) {
    console.log(cookies)
  } else {
    console.log('Cookie not found')
  }
  
  return true

}

export default otpVerify
