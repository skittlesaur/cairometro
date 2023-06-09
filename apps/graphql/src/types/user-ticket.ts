import { objectType } from 'nexus'
import { UserTickets } from 'nexus-prisma'

import RefundType from './refund'

const UserTicketType = objectType({
  name: UserTickets.$name,
  definition(t) {
    t.field(UserTickets.id)
    t.field(UserTickets.user)
    t.field(UserTickets.userId)
    t.field(UserTickets.from)
    t.field(UserTickets.to)
    t.field(UserTickets.price)
    t.field(UserTickets.date)
    
    t.field('refundRequest', {
      type: RefundType,
      resolve: async (parent, _, ctx) => {
        const refund = await ctx.prisma.refund.findFirst({
          where: {
            referenceId: parent.id,
          },
        })

        return refund
      },
    })
  },
})


export default UserTicketType