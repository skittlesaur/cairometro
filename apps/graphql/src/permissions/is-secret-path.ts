import { rule } from 'graphql-shield'

import { isDev } from '../utils/is-dev'

const isSecretPath = rule()(async (parent, args, ctx) => {
  if (isDev) {
    return true
  }

  const secretToken = process.env.SECRET_ENDPOINT_TOKEN

  if (!secretToken) return false

  return ctx.request.headers['x-secret'] === secretToken
})

export default isSecretPath