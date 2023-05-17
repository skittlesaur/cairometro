import { objectType } from 'nexus'
import { Schedule } from 'nexus-prisma'


const ScheduleType = objectType({
  name: Schedule.$name,
  definition(t) {
    t.field(Schedule.id)
    t.field(Schedule.line)
    t.field(Schedule.departureTime)
    t.field(Schedule.departureStation)
    t.field(Schedule.arrivalTime)
    t.field(Schedule.arrivalStation)
  },
})


export default ScheduleType