import { objectType } from 'nexus'
import { User } from 'nexus-prisma'

const UserType = objectType({
  name: User.$name,
  definition(t) {
    t.field(User.id)
    t.field(User.email)
    t.field(User.name)
    t.field(User.createdAt)
  },
})

export default UserType