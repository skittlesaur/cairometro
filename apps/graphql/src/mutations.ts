import { arg, floatArg, intArg, list, mutationType, nonNull, stringArg } from 'nexus'

import addLine from './resolvers/mutations/add-line'
import addStation from './resolvers/mutations/add-station'
import adminUpdateLine from './resolvers/mutations/admin-update-line'
import adminUpdateStation from './resolvers/mutations/admin-update-station'
import adminDeleteStation from './resolvers/mutations/delete-station'
import login from './resolvers/mutations/login'
import logout from './resolvers/mutations/logout'
import magicLinkVerify from './resolvers/mutations/magic-link-verifier'
import secretCreateMainAdminAccount from './resolvers/mutations/migrations/create-main-admin-account'
import secretDummyStationsData from './resolvers/mutations/migrations/dummy-database/dummy-stations-data'
import secretDummySchedule from './resolvers/mutations/migrations/dummy-database/schedule'
import otpVerify from './resolvers/mutations/otp-verifier'
import adminReorderStation from './resolvers/mutations/reorder-station'
import signUp from './resolvers/mutations/sign-up'
import Line from './types/line'
import LngLatInputType from './types/lng-lat-input'
import StationType from './types/station'
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

    t.field('logout', {
      type: 'Boolean',
      resolve: logout,
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
  },
})

export default mutations