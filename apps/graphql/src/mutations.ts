import { arg, mutationType, nonNull, stringArg, list } from 'nexus'

import login from './resolvers/mutations/login'
import logout from './resolvers/mutations/logout'
import magicLinkVerify from './resolvers/mutations/magic-link-verifier'
import secretCreateMainAdminAccount from './resolvers/mutations/migrations/create-main-admin-account'
import secretDummyStationsData from './resolvers/mutations/migrations/dummy-stations/dummy-stations-data'
import otpVerify from './resolvers/mutations/otp-verifier'
import signUp from './resolvers/mutations/sign-up'
import UserRoleEnumArg from './types/user-role-enum-arg'
import addStation from './resolvers/mutations/add-station'
import StationType from './types/station'

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

    t.field('logout', {
      type: 'Boolean',
      resolve: logout,
    })

    t.field('secretDummyStationsData', {
      type: 'Boolean',
      resolve: secretDummyStationsData,
    })

    t.field('secretCreateMainAdminAccount', {
      type: 'Boolean',
      resolve: secretCreateMainAdminAccount,
    })
    
    t.field('addStation', {
      type: StationType,
      args: {
          name: nonNull(stringArg()),
          name_ar: nonNull(stringArg()),
          location: nonNull(stringArg()),
          lineIds: nonNull(list(stringArg()))
        },
      resolve: addStation
    })
  },
})

export default mutations