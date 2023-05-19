import { rule } from 'graphql-shield'

import { UserRole } from '@prisma/client'

const isAdmin = rule()(async (parent, args, ctx) => {
  return ctx.user?.role === UserRole.ADMIN
})

export default isAdmin