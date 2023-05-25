import { inputObjectType } from 'nexus'

const scheduleTimeType = inputObjectType({
  name: 'scheduleTimeType',
  definition(t) {
    t.field('hour', { type: 'Int' })
    t.field('minute', { type: 'Int' })
    t.field('meridiem', { type: 'String' })
  },
})

export default scheduleTimeType