import { arg, intArg, nonNull, queryType, stringArg } from 'nexus'

import analyticsActiveLinesAndStations from './resolvers/queries/admin/analytics-active-lines-and-stations'
import analyticsTotalSoldTickets from './resolvers/queries/admin/analytics-average-response'
import analyticsSoldTickets from './resolvers/queries/admin/analytics-sold-tickets'
import analyticsTotalSubscribers from './resolvers/queries/admin/analytics-total-subscribers'
import analyticsTotalUsers from './resolvers/queries/admin/analytics-total-users'
import getRefundRequests from './resolvers/queries/admin/get-refund-requests'
import getVerificationRequests from './resolvers/queries/admin/get-verification-requests'
import pendingInvitations from './resolvers/queries/admin/pending-invitations'
import refundsAnalytics from './resolvers/queries/admin/refunds-analytics'
import seniorsAnalytics from './resolvers/queries/admin/seniors-analytics'
import teamMembers from './resolvers/queries/admin/team-members'
import getPrice from './resolvers/queries/get-price'
import invitation from './resolvers/queries/invitation'
import lines from './resolvers/queries/lines'
import me from './resolvers/queries/me'
import monthlyRevenue from './resolvers/queries/monthly-revenue'
import paginateStationsSchedule from './resolvers/queries/paginate-stations-schedule'
import recommendations from './resolvers/queries/recommendations'
import rideRouteByDate from './resolvers/queries/ride-route-by-date'
import stationById from './resolvers/queries/station-by-id'
import stations from './resolvers/queries/stations'
import userCards from './resolvers/queries/user-cards'
import userPurchaseHistory from './resolvers/queries/user-purchase-history'
import userSubscriptionHistory from './resolvers/queries/user-subscription-history'
import InvitationType from './types/invitation'
import LineType from './types/line'
import LinesAndStationsAnalyticsType from './types/lines-and-stations-type'
import passengersInputType from './types/passengers-input'
import RefundType from './types/refund'
import refundAnalyticsType from './types/refund-analytics'
import RevenueType from './types/revenue'
import RideTicketDataType from './types/ride-ticket-data'
import scheduleTimeType from './types/schedule-time'
import StationType from './types/station'
import Subscription from './types/subscription'
import TripRouteType from './types/trip-route'
import UserType from './types/user'
import UserCardType from './types/user-card'
import UserTicketType from './types/user-ticket'
import UserAnalyticsType from './types/users-analytics'


const queries = queryType({
  definition(t) {
    t.field('me', {
      type: UserType,
      resolve: me,
    })
    
    t.list.field('userCards', {
      type: UserCardType,
      resolve: userCards,
    })

    t.list.field('stations', {
      type: StationType,
      resolve: stations,
    })

    t.field('stationById', {
      type: StationType,
      args: {
        id: nonNull(stringArg()),
      },
      resolve: stationById,
    })
    
    t.list.field('recommendations', {
      type: RideTicketDataType,
      resolve: recommendations,
    })

    t.list.field('rideRouteByDate', {
      type: TripRouteType,
      args: {
        from: nonNull(stringArg()),
        to: nonNull(stringArg()),
        date: nonNull(stringArg()),
      },
      resolve: rideRouteByDate,
    })

    t.list.field('lines', {
      type: LineType,
      resolve: lines,
    })

    t.list.field('purchaseHistory', {
      type: UserTicketType,
      args: {
        subscriptionOnly: arg({ type: 'Boolean' }),
      },
      resolve: userPurchaseHistory,
    })

    t.list.field('userSubscriptionsHistory', {
      type: Subscription,
      resolve: userSubscriptionHistory,
    })

    t.field('analyticsSoldTickets', {
      type: 'Int',
      resolve: analyticsSoldTickets,
    })

    t.field('analyticsTotalUsers', {
      type: UserAnalyticsType,
      resolve: analyticsTotalUsers,
    })

    t.field('analyticsTotalSubscribers', {
      type: 'Int',
      resolve: analyticsTotalSubscribers,
    })

    t.field('totalSoldTickets', {
      type: 'Int',
      resolve: analyticsTotalSoldTickets,
    })

    t.field('analyticsActiveLinesAndStations', {
      type: LinesAndStationsAnalyticsType,
      resolve: analyticsActiveLinesAndStations,
    })

    t.field('refundsAnalytics', {
      type: refundAnalyticsType,
      resolve: refundsAnalytics,
    })

    t.field('seniorsAnalytics', {
      type: refundAnalyticsType,
      resolve: seniorsAnalytics,
    })

    t.field('paginateStationsSchedule', {
      type: RideTicketDataType,
      args: {
        from: nonNull(stringArg()),
        to: nonNull(stringArg()),
        travelTime: arg({ type: scheduleTimeType }),
        date: nonNull(stringArg()),
        page: nonNull(intArg()),
        take: nonNull(intArg()),
        passengers: nonNull(arg({ type: passengersInputType })),
      },
      resolve: paginateStationsSchedule,
    })

    t.field('getPrice', {
      type: 'Int',
      args: {
        from: nonNull(stringArg()),
        to: nonNull(stringArg()),
        passengers: nonNull(arg({ type: passengersInputType })),
      },
      resolve: getPrice,
    })
    
    t.field('getInvitation', {
      type: InvitationType,
      args: {
        token: nonNull(stringArg()),
      },
      resolve: invitation,
    })

    t.list.field('adminGetRefundRequests', {
      type: RefundType,
      args: {
        page: nonNull(intArg()),
        take: intArg(),
        filterBy: stringArg(),
        search: stringArg(),
      },
      resolve: getRefundRequests,
    })

    t.list.field('adminTeamMembers', {
      type: UserType,
      resolve: teamMembers,
    })
    
    t.list.field('adminPendingInvitations', {
      type: InvitationType,
      resolve: pendingInvitations,
    })

    t.list.field('adminGetVerificationRequests', {
      type: UserType,
      args: {
        page: nonNull(intArg()),
        take: intArg(),
        filterBy: stringArg(),
        search: stringArg(),
      },
      resolve: getVerificationRequests,
    })
    
    t.list.field('monthlyRevenue', {
      type: RevenueType,
      resolve: monthlyRevenue,
    })
  },
})

export default queries