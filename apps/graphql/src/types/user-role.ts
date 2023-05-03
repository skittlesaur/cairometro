import { enumType } from 'nexus/src/core'
import { UserRole } from 'nexus-prisma'

UserRole.name
UserRole.members
enumType(UserRole)

// const UserRole = enumType({
//   name: UserRole.name,
//   members: UserRole.members,
// })

export default UserRole