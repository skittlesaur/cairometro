import { objectType } from 'nexus'
import { User } from 'nexus-prisma'

import UserRoleEnum from './user-role'


const UserType = objectType({
  name: User.$name,
  definition(t) {
    t.field(User.id)
    t.field('role', { type: UserRoleEnum })
    t.field(User.email)
    t.field(User.name)
    t.field(User.createdAt)
  },
})


export default UserType