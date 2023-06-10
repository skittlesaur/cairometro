import { arg, booleanArg, floatArg, intArg, list, mutationType, nonNull, stringArg } from 'nexus'

import addLine from './resolvers/mutations/add-line'
import addRefund from './resolvers/mutations/add-refund'
import addStation from './resolvers/mutations/add-station'
import adminInviteTeammate from './resolvers/mutations/admin-invite-teammate'
import adminRemoveTeammate from './resolvers/mutations/admin-remove-teammate'
import adminUpdateLine from './resolvers/mutations/admin-update-line'
import adminUpdateStation from './resolvers/mutations/admin-update-station'
import adminDeleteStation from './resolvers/mutations/delete-station'
import login from './resolvers/mutations/login'
import secretCreateMainAdminAccount from './resolvers/mutations/migrations/create-main-admin-account'
import secretDummyStationsData from './resolvers/mutations/migrations/dummy-database/dummy-stations-data'
import secretDummySchedule from './resolvers/mutations/migrations/dummy-database/schedule'
import createPayment from './resolvers/mutations/payment'
import adminReorderStation from './resolvers/mutations/reorder-station'
import signUp from './resolvers/mutations/sign-up'
import createSubscription from './resolvers/mutations/subscription'
import updateInvitation from './resolvers/mutations/update-invitation'
import updateRefundStatus from './resolvers/mutations/update-refund-status'
import updateVerificationStatus from './resolvers/mutations/update-verification-status'
import Line from './types/line'
import LngLatInputType from './types/lng-lat-input'
import oneTimeInput from './types/one-time-input'
import RefundStatusEnumArg from './types/refund-status-enum-arg'
import StationType from './types/station'
import StatusEnum from './types/status-arg'
import subscriptionEnumArg from './types/subscription-input'
import TicketTypeEnumArg from './types/ticket-type-enum-arg'
import UserRoleEnumArg from './types/user-role-enum-arg'
import VerificationStatusEnumArg from './types/verification-status-enum-arg'


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

    t.field('secretDummyStationsData', {
      type: 'Boolean',
      resolve: secretDummyStationsData,
    })

    t.field('secretDummySchedule', {
      type: 'Boolean',
      resolve: secretDummySchedule,
    })

    t.field('secretCreateMainAdminAccount', {
      type: 'Boolean',
      resolve: secretCreateMainAdminAccount,
    })

    t.field('updateInvitation', {
      type: 'Boolean',
      args: {
        token: nonNull(stringArg()),
        status: nonNull(StatusEnum),
      },
      resolve: updateInvitation,
    })

    t.field('requestRefund', {
      type: 'Boolean',
      args: {
        id: nonNull(stringArg()),
        ticketType: nonNull(arg({ type: TicketTypeEnumArg })),
      },
      resolve: addRefund,
    })

    t.field('adminUpdateRefundRequest', {
      type: 'Boolean',
      args: {
        refundRequestId: nonNull(stringArg()),
        status: nonNull(arg({ type: RefundStatusEnumArg })),
      },
      resolve: updateRefundStatus,
    })
    
    t.field('adminAddStation', {
      type: StationType,
      args: {
        name: nonNull(stringArg()),
        name_ar: nonNull(stringArg()),
        location: LngLatInputType,
        lineIds: nonNull(list(stringArg())),
      },
      resolve: addStation,
    })

    t.field('adminReorderStation', {
      type: 'Boolean',
      args: {
        lineId: nonNull(stringArg()),
        stationId: nonNull(stringArg()),
        newPosition: nonNull(intArg()),
      },
      resolve: adminReorderStation,
    })

    t.field('adminDeleteStation', {
      type: 'Boolean',
      args: {
        stationId: nonNull(stringArg()),
      },
      resolve: adminDeleteStation,
    })

    t.field('adminUpdateStation', {
      type: 'Boolean',
      args: {
        stationId: nonNull(stringArg()),
        name: stringArg(),
        name_ar: stringArg(),
        locationLngLat: LngLatInputType,
        lineIds: list(stringArg()),
      },
      resolve: adminUpdateStation,
    })

    t.field('adminUpdateLine', {
      type: 'Boolean',
      args: {
        lineId: nonNull(stringArg()),
        name: stringArg(),
        name_ar: stringArg(),
        color: stringArg(),
        priceZoneOne: floatArg(),
        priceZoneOneSeniors: floatArg(),
        priceZoneTwo: floatArg(),
        priceZoneTwoSeniors: floatArg(),
        priceZoneThree: floatArg(),
        priceZoneThreeSeniors: floatArg(),
      },
      resolve: adminUpdateLine,
    })

    t.field('adminAddLine', {
      type: Line,
      args: {
        name: nonNull(stringArg()),
        name_ar: nonNull(stringArg()),
        color: nonNull(stringArg()),
        priceZoneOne: nonNull(floatArg()),
        priceZoneOneSeniors: nonNull(floatArg()),
        priceZoneTwo: nonNull(floatArg()),
        priceZoneTwoSeniors: nonNull(floatArg()),
        priceZoneThree: nonNull(floatArg()),
        priceZoneThreeSeniors: nonNull(floatArg()),
      },
      resolve: addLine,
    })

    t.field('adminRemoveTeammate', {
      type: 'Boolean',
      args: {
        email: nonNull(stringArg()),
      },
      resolve: adminRemoveTeammate,
    })
    
    t.field('adminInviteTeammate', {
      type: 'Boolean',
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
        role: nonNull(arg({ type: UserRoleEnumArg })),
      },
      resolve: adminInviteTeammate,
    })


    t.field('adminUpdateVerificationRequest', {
      type: 'Boolean',
      args: {
        userId: nonNull(stringArg()),
        documentVerified: nonNull(arg({ type: VerificationStatusEnumArg })),
      },
      resolve: updateVerificationStatus,
    })

    
    t.field('createPayment', {
      type: 'Boolean',
      args: {
        cardNumber: nonNull(stringArg()),
        expiryMonth: nonNull(stringArg()),
        expiryYear: nonNull(stringArg()),
        cardCvc: nonNull(stringArg()),
        saveCard: nonNull(booleanArg()),
        metaData: oneTimeInput,
      },
      resolve: createPayment,
    })

    t.field('createSubscription', {
      type: 'Boolean',
      args: {
        cardNumber: nonNull(stringArg()),
        expiryMonth: nonNull(stringArg()),
        expiryYear: nonNull(stringArg()),
        cardCvc: nonNull(stringArg()),
        saveCard: nonNull(booleanArg()),
        metaData: nonNull(subscriptionEnumArg),
      },
      resolve: createSubscription,

    })
  },
})

export default mutations