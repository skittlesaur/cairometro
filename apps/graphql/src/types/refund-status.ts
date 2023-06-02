import { enumType } from 'nexus'
import { RefundStatus } from 'nexus-prisma'

const RefundStatusEnum = enumType(RefundStatus)

export default RefundStatusEnum