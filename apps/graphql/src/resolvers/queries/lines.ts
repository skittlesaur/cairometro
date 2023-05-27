import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'

const stations: FieldResolver<'Query', 'lines'> =
  async (_, args, ctx: Context) => {
    const { prisma } = ctx

    const lines = await prisma.line.findMany({
      include: {
        StationPositionInLine: {
          include: {
            station: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    // sort stations by position in line
    const sortedLines = lines.map((line) => {
      const sortedStations = line.StationPositionInLine.sort(
        (a, b) => a.position - b.position,
      )

      return {
        ...line,
        sortedStations: sortedStations.map((station) => station.station),
      }
    })

    return sortedLines
  }

export default stations
