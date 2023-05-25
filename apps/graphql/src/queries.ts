import { arg, intArg, nonNull, queryType, stringArg } from 'nexus'

import analyticsAverageCustomerSupportResponse from './resolvers/queries/admin/analytics-average-response'
import analyticsSoldTickets from './resolvers/queries/admin/analytics-sold-tickets'
import analyticsTotalSubscribers from './resolvers/queries/admin/analytics-total-subscribers'
import analyticsTotalUsers from './resolvers/queries/admin/analytics-total-users'
import lines from './resolvers/queries/lines'
import me from './resolvers/queries/me'
import paginateStationsSchedule from './resolvers/queries/paginate-stations-schedule'
import stationById from './resolvers/queries/station-by-id'
import stations from './resolvers/queries/stations'
import LineType from './types/line'
import passengersInputType from './types/passengers-input'
import RideTicketDataType from './types/ride-ticket-data'
import scheduleTimeType from './types/schedule-time'
import StationType from './types/station'
import UserType from './types/user'
import UserAnalyticsType from './types/users-analytics'
import RefundType from './types/refund'
import getRefundRequests from './resolvers/queries/admin/get-refund-requests'


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
    
    t.list.field('adminGetRefundRequests', {
      type: RefundType,
      args:{
        page: nonNull(intArg())
      },
      resolve: getRefundRequests,
    })
  },
})

export default queries