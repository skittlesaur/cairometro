import { objectType } from 'nexus'


const UserAnalyticsType = objectType({
  name: 'UsersAnalytics',
  definition(t) {
    t.field('totalUsers', { type: 'Int' })
    t.field('totalSeniors', { type: 'Int' })
    t.field('totalAdults', { type: 'Int' })
    t.field('weeklyUsers', { type: 'Int' })
    t.field('weeklyUsersDiff', { type: 'Float' })
    t.field('monthlyUsers', { type: 'Int' })
    t.field('monthlyUsersDiff', { type: 'Float' })
  },
})

export default UserAnalyticsType