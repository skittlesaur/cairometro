import { objectType } from 'nexus'


const refundAnalyticsType = objectType({
  name: 'RefundAnalytics',
  definition(t) {
    t.field('total', { type: 'Int' })
    t.field('totalApproved', { type: 'Int' })
    t.field('totalRejected', { type: 'Int' })
    t.field('totalThisMonth', { type: 'Int' })
  },
})


export default refundAnalyticsType