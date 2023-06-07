import { enumType } from 'nexus'

const StatusEnum = enumType({
  name: 'Status',
  members: {
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
  },
})

export default StatusEnum