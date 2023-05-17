import { objectType } from 'nexus'
import { Line } from 'nexus-prisma'


const LineType = objectType({
  name: Line.$name,
  definition(t) {
    t.field(Line.id)
    t.field(Line.name)
    t.field(Line.name_ar)
  },
})


export default LineType