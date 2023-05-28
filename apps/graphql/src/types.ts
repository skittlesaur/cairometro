import { DateTimeResolver } from 'graphql-scalars'

import { asNexusMethod } from 'nexus'

import LineType from './types/line'
import LinesAndStationsAnalyticsType from './types/lines-and-stations-type'
import LngLatType from './types/lng-lat'
import LngLatInputType from './types/lng-lat-input'
import passengersInputType from './types/passengers-input'
import RideTicketDataType from './types/ride-ticket-data'
import RideTicketSchedule from './types/ride-ticket-schedule'
import scheduleTimeType from './types/schedule-time'
import StationType from './types/station'
import StationPositionInLineType from './types/station-position-in-line'
import TripRouteType from './types/trip-route'
import UserType from './types/user'
import UserRoleEnum from './types/user-role'
import UserAnalyticsType from './types/users-analytics'

const DateTime = asNexusMethod(DateTimeResolver, 'date')

const types = [
  DateTime,
  UserType,
  UserRoleEnum,
  LineType,
  StationType,
  LngLatType,
  StationPositionInLineType,
  UserAnalyticsType,
  RideTicketDataType,
  RideTicketSchedule,
  scheduleTimeType,
  passengersInputType,
  TripRouteType,
  LinesAndStationsAnalyticsType,
  LngLatInputType,
]

export default types