import { DateTimeResolver } from 'graphql-scalars'

import { asNexusMethod } from 'nexus'

import LineType from './types/line'
import LngLatType from './types/lng-lat'
import ScheduleType from './types/schedule'
import StationType from './types/station'
import StationPositionInLineType from './types/station-position-in-line'
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
  ScheduleType,
  LngLatType,
  StationPositionInLineType,
  UserAnalyticsType,
]

export default types