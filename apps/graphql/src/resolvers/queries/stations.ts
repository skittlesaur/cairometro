import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

const stations: FieldResolver<'Query', 'stations'> =
  async (_, args, ctx) => {
    const { prisma } = ctx

    const stations = await prisma.station.findMany()

    return stations
  }
  
export default stations
