import { inputObjectType } from 'nexus'

import VerificationStatusEnum from './verification-status'

const VerificationStatusEnumArg = inputObjectType({
  name: 'VerificationStatusEnumArg',
  definition(t) {
    t.field('verificationstatus', { type: VerificationStatusEnum })
  },
})

export default VerificationStatusEnumArg