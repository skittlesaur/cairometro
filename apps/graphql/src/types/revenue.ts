import { objectType } from 'nexus'

const RevenueType = objectType({
  name: 'Revenue',
  definition(t) {
    t.int('month')
    t.float('revenue')
  },
})

export default RevenueType