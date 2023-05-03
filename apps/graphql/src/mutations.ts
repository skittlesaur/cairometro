import { arg, mutationType, stringArg } from 'nexus'

import signup from './resolvers/mutations/signup'
import UserType from './types/user'
import UserRoleEnumArg from './types/user-role-enum-arg'

const mutations = mutationType({
  definition(t) {
    t.field('signup', {
      type: UserType,
      args: { userRole: arg({ type: UserRoleEnumArg }), email: stringArg(), name: stringArg() },
      resolve: signup,
    })
  },
})

export default mutations