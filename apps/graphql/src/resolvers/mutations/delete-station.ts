import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

const adminDeleteStation: FieldResolver<'Mutation', 'adminDeleteStation'> =
  async (_, args, ctx) => {
    const { prisma } = ctx
    
    const { stationId } = args

    const station = await prisma.station.findUnique({
      where: {
        id: stationId,
      },
    })

    if (!station) {
      throw new GraphQLError('station not found')
    }
    
    // If the station is a transfer station, DO NOT delete it
    if (station.lineIds.length > 1) {
      throw new GraphQLError('cannot delete transfer station, remove it from other lines first')
    }
    
    // Update the positions of the stations after the deleted station
    await prisma.stationPositionInLine.updateMany({
      where: {
        lineId: station.lineIds[0],
      },
      data: {
        position: {
          decrement: 1,
        },
      },
    })
    
    // Delete the station
    await prisma.station.delete({
      where: {
        id: stationId,
      },
    })

    return true
  }

export default adminDeleteStation