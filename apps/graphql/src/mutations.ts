import { arg, mutationType, nonNull, stringArg } from 'nexus'

import login from './resolvers/mutations/login'
import secretDummyStationsData from './resolvers/mutations/migrations/dummy-stations/dummy-stations-data'
import magicLinkVerify from './resolvers/mutations/magic-link-verifier'
import otpVerify from './resolvers/mutations/otp-verifier'
import signUp from './resolvers/mutations/sign-up'
import UserRoleEnumArg from './types/user-role-enum-arg'

const mutations = mutationType({
  definition(t) {
    t.field('login', {
      type: 'Boolean',
      args: {
        email: nonNull(stringArg()),
      },
      resolve: login,
    })

    t.field('signUp', {
      type: 'Boolean',
      args: {
        userRole: nonNull(arg({ type: UserRoleEnumArg })),
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
        documentUrl: stringArg(),
      },
      resolve: signUp,
    })

    t.field('magicLinkVerification', {
      type: 'Boolean',
      args: {
        link: nonNull(stringArg()),
      },
      resolve: magicLinkVerify
      ,
    })

    t.field('otpVerification', {
      type: 'Boolean',
      args: {
        code: nonNull(stringArg()),
      },
      resolve: otpVerify
      ,
    })

    t.field('secretDummyStationsData', {
      type: 'Boolean',
      resolve: secretDummyStationsData,
    })
  },
})

export default mutations