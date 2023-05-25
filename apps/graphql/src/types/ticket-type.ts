import { enumType } from 'nexus'
import { TicketType } from 'nexus-prisma'

const TicketTypeEnum = enumType(TicketType)

export default TicketTypeEnum