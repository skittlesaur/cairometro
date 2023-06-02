import { arg, intArg, nonNull, queryType, stringArg } from 'nexus'

import analyticsActiveLinesAndStations from './resolvers/queries/admin/analytics-active-lines-and-stations'
import analyticsAverageCustomerSupportResponse from './resolvers/queries/admin/analytics-average-response'
import analyticsSoldTickets from './resolvers/queries/admin/analytics-sold-tickets'
import analyticsTotalSubscribers from './resolvers/queries/admin/analytics-total-subscribers'
import analyticsTotalUsers from './resolvers/queries/admin/analytics-total-users'
import getRefundRequests from './resolvers/queries/admin/get-refund-requests'
import refundsAnalytics from './resolvers/queries/admin/refunds-analytics'
import getPrice from './resolvers/queries/get-price'
import lines from './resolvers/queries/lines'
import me from './resolvers/queries/me'
import paginateStationsSchedule from './resolvers/queries/paginate-stations-schedule'
import rideRouteByDate from './resolvers/queries/ride-route-by-date'
import stationById from './resolvers/queries/station-by-id'
import stations from './resolvers/queries/stations'
import LineType from './types/line'
import LinesAndStationsAnalyticsType from './types/lines-and-stations-type'
import passengersInputType from './types/passengers-input'
import RefundType from './types/refund'
import refundAnalyticsType from './types/refund-analytics'
import RideTicketDataType from './types/ride-ticket-data'
import scheduleTimeType from './types/schedule-time'
import StationType from './types/station'
import TripRouteType from './types/trip-route'
import UserType from './types/user'
import UserAnalyticsType from './types/users-analytics'


const queries = queryType({
  definition(t) {
    t.field('me', {
      type: UserType,
      resolve: me,
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

    t.field('analyticsAverageCustomerSupportResponse', {
      type: 'Int',
      resolve: analyticsAverageCustomerSupportResponse,
    })

    t.field('analyticsActiveLinesAndStations', {
      type: LinesAndStationsAnalyticsType,
      resolve: analyticsActiveLinesAndStations,
    })

    t.field('refundsAnalytics', {
      type: refundAnalyticsType,
      resolve: refundsAnalytics,
    })

    t.field('paginateStationsSchedule', {
      type: RideTicketDataType,
      args: {
        from: nonNull(stringArg()),
        to: nonNull(stringArg()),
        travelTime: arg({ type: scheduleTimeType }),
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

    t.list.field('adminGetRefundRequests', {
      type: RefundType,
      args: {
        page: nonNull(intArg()),
        take: intArg(),
      },
      resolve: getRefundRequests,
    })
  },
})

export default queries