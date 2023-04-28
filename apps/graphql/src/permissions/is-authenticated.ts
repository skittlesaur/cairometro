import { rule } from 'graphql-shield'

const isAuthenticated = rule()(async (parent, args, ctx) => {
  return ctx.user !== null
})

export default isAuthenticated