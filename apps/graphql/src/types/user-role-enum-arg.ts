import { inputObjectType } from 'nexus'

import UserRoleEnum from './user-role'

const UserRoleEnumArg = inputObjectType({
  name: 'UserRoleEnumArg',
  definition(t) {
    t.field('userRole', { type: UserRoleEnum })
  },
})

export default UserRoleEnumArg