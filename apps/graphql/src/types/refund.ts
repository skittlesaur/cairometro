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
      },
})


export default RefundType