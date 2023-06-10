import { enumType } from 'nexus'
import { VerificationStatus } from 'nexus-prisma'

const VerificationStatusEnum = enumType(VerificationStatus)

export default VerificationStatusEnum