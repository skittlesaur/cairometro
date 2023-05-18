import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'

const stations: FieldResolver<'Query', 'stations'> =
  async (_, args, ctx: Context) => {
    const { prisma } = ctx

    const stations = await prisma.station.findMany()

    return stations
  }
  
export default stations
