import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

import generateAccessToken from '../../lib/generate-access-token'


const magicLinkVerify: FieldResolver< 'Mutation', 'magicLinkVerification'> = 
async (_, args, ctx) =>
{

  
  const { prisma } = ctx
  const { link } = args
  // const accessTokenCookieDomain = process.env.accessTokenCookieDomain

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
  if (!magicLink){
    throw new GraphQLError('link does not exist')
  }
  const expiryDate = magicLink?.expiryDate as Date
  const userID = magicLink?.userID as string
  if (expiryDate < new Date()){
    await prisma.magicToken.delete({
      where: {
        id: magicLink.id,
      },
    })
    throw new GraphQLError('link is expired please try again')
  }
  const token = generateAccessToken({ id: userID } )
  await ctx.request.cookieStore?.set({
    name: 'AccessToken', 
    value: token,
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

export default magicLinkVerify
