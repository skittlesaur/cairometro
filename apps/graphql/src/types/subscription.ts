import { objectType } from 'nexus'
import { Subscriptions } from 'nexus-prisma'


const Subscription = objectType({
  name: Subscriptions.$name,
  definition(t) {
    t.field(Subscriptions.id)
    t.field(Subscriptions.user)
    t.field(Subscriptions.type)
    t.field(Subscriptions.tier)
    t.field(Subscriptions.createdAt)
    t.field(Subscriptions.expiresAt)
    t.field('isActive', {
      type: 'Boolean',
      resolve: async (parent) => {
        const expiresAt = parent.expiresAt
        const now = new Date()
        
        return expiresAt > now
      },
    })
    t.field('refundRequest', {
      type: 'DateTime',
      resolve: async (parent, _, ctx) => {
        const { prisma, user } = ctx

        const refund = await prisma.refund.findFirst({
          where: {
            referenceId: parent.id,
            ticketType: 'SUBSCRIPTION',
            userId: user?.id,
          },
        })

        return refund?.createdAt
      },
    })
  },
})

export default Subscription