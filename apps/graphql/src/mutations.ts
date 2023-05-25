import { arg, mutationType, nonNull, stringArg, list, enumType } from 'nexus'

import addStation from './resolvers/mutations/add-station'
import login from './resolvers/mutations/login'
import logout from './resolvers/mutations/logout'
import magicLinkVerify from './resolvers/mutations/magic-link-verifier'
import secretCreateMainAdminAccount from './resolvers/mutations/migrations/create-main-admin-account'
import secretDummyStationsData from './resolvers/mutations/migrations/dummy-stations/dummy-stations-data'
import otpVerify from './resolvers/mutations/otp-verifier'
import signUp from './resolvers/mutations/sign-up'
import StationType from './types/station'
import UserRoleEnumArg from './types/user-role-enum-arg'
import addRefund from './resolvers/mutations/add-refund'
import RefundStatusEnumArg from './types/refund-status-enum-arg'
import TicketTypeEnumArg from './types/ticket-type-enum-arg'
import updateRefundStatus from './resolvers/mutations/update-refund-status'

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
        lineIds: nonNull(list(stringArg())),
      },
      resolve: addStation,
    })

    t.field('adminUpdateRefundRequest', {
      type: 'Boolean',
      args: {
          refundRequestId: nonNull(stringArg()),
          status: nonNull(arg({ type: RefundStatusEnumArg })),
        },
      resolve: updateRefundStatus
    })

    t.field('requestRefund', {
      type: 'Boolean',
      args: {
          status: nonNull(arg({ type: RefundStatusEnumArg })),
          ticketType: nonNull(arg({ type: TicketTypeEnumArg })),
          userId: nonNull(stringArg()),
        },
      resolve: addRefund
    })
  },
})

export default mutations