import { DateTimeResolver } from 'graphql-scalars'

import { asNexusMethod } from 'nexus'

import user from './types/user'

const DateTime = asNexusMethod(DateTimeResolver, 'date')

const types = [
  DateTime, user,
]

export default types