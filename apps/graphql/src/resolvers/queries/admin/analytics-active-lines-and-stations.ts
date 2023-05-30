import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../../context'

const analyticsActiveLinesAndStations: FieldResolver<'Query', 'analyticsActiveLinesAndStations'> =
  async (_, _args, ctx: Context) => {
    // adminPermission(ctx)

    const { prisma } = ctx

    const totalLines = await prisma.line.count()
    const totalStations = await prisma.station.count()

    return {
      totalLines,
      totalStations,
    }
  }

export default analyticsActiveLinesAndStations