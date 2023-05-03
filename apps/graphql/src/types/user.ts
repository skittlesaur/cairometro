import { enumType, objectType } from 'nexus'
import { User, UserRole } from 'nexus-prisma'

// import UserRoleEnum from './user-role'


const UserType = objectType({
  name: User.$name,
  definition(t) {
    t.field(User.id)
    t.field('userRole', { type: UserRoleEnum })
    t.field(User.email)
    t.field(User.name)
    t.field(User.createdAt)
  },
})

const UserRoleEnum = enumType({
  name: 'UserRoleEnum',
  members: UserRole.members,
})


export default UserType