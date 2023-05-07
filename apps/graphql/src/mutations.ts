import { arg, mutationType, nonNull, stringArg } from 'nexus'

import signUp from './resolvers/mutations/sign-up'
import UserType from './types/user'
import UserRoleEnumArg from './types/user-role-enum-arg'

const mutations = mutationType({
  definition(t) {
    t.field('signUp', {
      type: UserType,
      args: {
        userRole: nonNull(arg({ type: UserRoleEnumArg })),
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      resolve: signUp,
    })
  },
})

export default mutations