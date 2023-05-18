import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

import { Context } from '../../context'
import generateAccessToken from '../../lib/generate-access-token'
import { isDev } from '../../utils/is-dev'


const magicLinkVerify: FieldResolver<'Mutation', 'magicLinkVerification'> =
  async (_, args, ctx: Context) => {
    const { prisma } = ctx
    const { link } = args
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
      throw new GraphQLError('link does not exist')
    }
    const expiryDate = magicLink?.expiryDate as Date
    const userID = magicLink?.userID as string
    if (expiryDate < new Date()) {
      await prisma.magicToken.delete({
        where: {
          id: magicLink.id,
        },
      })
      throw new GraphQLError('link is expired please try again')
    }
    const token = generateAccessToken({ id: userID })

    await ctx.request?.cookieStore?.set({
      name: 'access',
      value: token,
      domain: accessTokenCookieDomain,
      path: '/',
      sameSite: 'lax',
      secure: !isDev,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    })

    return true
  }

export default magicLinkVerify
