import { objectType } from 'nexus'
import { Refund } from 'nexus-prisma'


const RefundType = objectType({
  name: Refund.$name,
  definition(t) {
    t.field(Refund.id)
    t.field(Refund.user)
    t.field(Refund.userId)
    t.field(Refund.status)
    t.field(Refund.ticketType)
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field(Refund.message)
    t.field(Refund.price)
  },
})


export default RefundType