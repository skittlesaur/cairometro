import { arg, mutationType, nonNull, stringArg } from 'nexus'

import login from './resolvers/mutations/login'
import signUp from './resolvers/mutations/sign-up'
import UserType from './types/user'
import UserRoleEnumArg from './types/user-role-enum-arg'

const mutations = mutationType({
  definition(t) {
    t.field('login', {
      type: UserType,
      args: {
        email: nonNull(stringArg()),
      },
      resolve: login,
    })

    t.field('signUp', {
      type: UserType,
      args: {
        userRole: nonNull(arg({ type: UserRoleEnumArg })),
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
        documentUrl: stringArg(),
      },
      resolve: signUp,
    })
  },
})

export default mutations