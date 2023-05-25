import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'

const stationById: FieldResolver<'Query', 'stationById'> =
  async (_, args, ctx: Context) => {
    const { prisma } = ctx

    const station = await prisma.station.findUnique({
      where: {
        id: args.id,
      },
    })

    return station
  }

export default stationById
