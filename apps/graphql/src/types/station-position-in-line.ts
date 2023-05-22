import { objectType } from 'nexus'
import { StationPositionInLine } from 'nexus-prisma'



const StationPositionInLineType = objectType({
  name: StationPositionInLine.$name,
  definition(t) {
    t.field(StationPositionInLine.id)
    t.field(StationPositionInLine.line)
    t.field(StationPositionInLine.station)
    t.field(StationPositionInLine.position)
  },
})


export default StationPositionInLineType