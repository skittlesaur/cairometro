import { DateTimeResolver } from 'graphql-scalars'

import { asNexusMethod } from 'nexus'

import user from './types/user'
// import UserRole from './types/user-role'


const DateTime = asNexusMethod(DateTimeResolver, 'date')

const types = [
  DateTime, user,
]

export default types