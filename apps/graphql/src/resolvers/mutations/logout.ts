import { FieldResolver } from 'nexus'

import { Context } from '../../context'
import { isDev } from '../../utils/is-dev'

const logout: FieldResolver<'Mutation', 'logout'> =
  async (_, args, ctx: Context) => {
    const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? ''

    await ctx.request?.cookieStore?.set({
      name: 'access',
      value: '',
      domain: accessTokenCookieDomain,
      path: '/',
      sameSite: 'lax',
      secure: !isDev,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    })

    return true
  }

export default logout