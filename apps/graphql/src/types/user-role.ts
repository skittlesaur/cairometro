import { enumType } from 'nexus'
import { UserRole } from 'nexus-prisma'

const UserRoleEnum = enumType(UserRole)

// const UserRoleEnum = enumType({
//   name: UserRole.name,
//   members: UserRole.members,
// })

// const UserRoleEnum = enumType({
//   name: 'UserRoleEnum',
//   members: ['ADMIN', 'ADULT', 'SENIOR'],
// })

export default UserRoleEnum