import { objectType } from 'nexus'


const LinesAndStationsAnalyticsType = objectType({
  name: 'LinesAndStationsAnalytics',
  definition(t) {
    t.field('totalLines', { type: 'Int' })
    t.field('totalStations', { type: 'Int' })
  },
})


export default LinesAndStationsAnalyticsType