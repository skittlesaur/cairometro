import { arg, mutationType, stringArg } from 'nexus'
import { UserRole } from 'nexus-prisma'

import signup from './resolvers/mutations/signup'
import UserType from './types/user'

const mutations = mutationType({
  definition(t) {
    t.field('signup', {
      type: UserType,
      args: { userRole: arg({ type: UserRole }), email: stringArg(), name: stringArg() },
      resolve: signup,
    })
  },
})

export default mutations