import { inputObjectType } from 'nexus'

import RefundStatusEnum from './refund-status'

const RefundStatusEnumArg = inputObjectType({
  name: 'RefundStatusEnumArg',
  definition(t) {
    t.field('refundStatus', { type: RefundStatusEnum })
  },
})

export default RefundStatusEnumArg