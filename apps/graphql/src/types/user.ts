import { objectType } from 'nexus'
import { User } from 'nexus-prisma'

import Subscription from './subscription'
import UserRoleEnum from './user-role'


const UserType = objectType({
  name: User.$name,
  definition(t) {
    t.field(User.id)
    t.field('role', { type: UserRoleEnum })
    t.field(User.email)
    t.field(User.name)
    t.field(User.createdAt)

    t.field('subscription', {
      type: Subscription,
      resolve: async (parent, _, ctx) => {
        const subscription = await ctx.prisma.subscriptions.findFirst({
          where: {
            userId: parent.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        return subscription
      },
    })
  },
})


export default UserType