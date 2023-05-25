import { inputObjectType } from 'nexus'

import TicketTypeEnum from './ticket-type'

const TicketTypeEnumArg = inputObjectType({
  name: 'TicketTypeEnumArg',
  definition(t) {
    t.field('ticketType', { type: TicketTypeEnum })
  },
})

export default TicketTypeEnumArg