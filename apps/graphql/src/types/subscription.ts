import { objectType } from 'nexus'
import { Subscriptions } from 'nexus-prisma'


const Subscription = objectType({
  name: Subscriptions.$name,
  definition(t) {
    t.field(Subscriptions.id)
    t.field(Subscriptions.user)
    t.field(Subscriptions.type)
    t.field(Subscriptions.tier)
    t.field('isActive', {
      type: 'Boolean',
      resolve: async (parent) => {
        const expiresAt = parent.expiresAt
        const now = new Date()
        
        const diffInDays = Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 3600 * 24))

        return diffInDays > 0
      },
    })
  },
})

export default Subscription