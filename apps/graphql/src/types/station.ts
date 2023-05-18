import { objectType } from 'nexus'
import { Station } from 'nexus-prisma'


const StationType = objectType({
  name: Station.$name,
  definition(t) {
    t.field(Station.id)
    t.field(Station.name)
    t.field(Station.name_ar)
    t.field(Station.location)
    t.field(Station.lines)
    t.field(Station.departureSchedules)
    t.field(Station.arrivalSchedules)
  },
})


export default StationType