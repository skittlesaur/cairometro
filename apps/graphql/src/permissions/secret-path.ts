
import { GraphQLError } from 'graphql/error'

import { Context } from '../context'
import { isDev } from '../utils/is-dev'

const secretPathPermission = (ctx: Context) => {
  if (isDev) {
    return true
  }

  const secretToken = process.env.SECRET_ENDPOINT_TOKEN

  if (!secretToken) throw new GraphQLError('No secret token provided')

  const isVerified = ctx.request.headers.get('x-secret-endpoint-token') === secretToken

  if (!isVerified) throw new GraphQLError('Not authorized')

  return true
}

export default secretPathPermission