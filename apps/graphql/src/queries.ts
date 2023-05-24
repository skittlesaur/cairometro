import { intArg, nonNull, queryType, stringArg } from 'nexus'

import analyticsAverageCustomerSupportResponse from './resolvers/queries/admin/analytics-average-response'
import analyticsSoldTickets from './resolvers/queries/admin/analytics-sold-tickets'
import analyticsTotalSubscribers from './resolvers/queries/admin/analytics-total-subscribers'
import analyticsTotalUsers from './resolvers/queries/admin/analytics-total-users'
import lines from './resolvers/queries/lines'
import me from './resolvers/queries/me'
import paginateStationsSchedule from './resolvers/queries/paginate-stations-schedule'
import stations from './resolvers/queries/stations'
import LineType from './types/line'
import ScheduleType from './types/schedule'
import StationType from './types/station'
import UserType from './types/user'
import UserAnalyticsType from './types/users-analytics'


const queries = queryType({
  definition(t){
    t.field('me', {
      type: UserType,
      resolve: me,
    })

    t.list.field('stations', {
      type: StationType,
      resolve: stations,
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
      type: ScheduleType,
      args: {
        from: nonNull(stringArg()),
        to: nonNull(stringArg()),
        travelTime: 'DateTime',
        page: nonNull(intArg()),
        take: nonNull(intArg()),
      },
      resolve: paginateStationsSchedule,
    })
  },
})

export default queries