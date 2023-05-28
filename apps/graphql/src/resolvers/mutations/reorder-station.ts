import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

const adminReorderStation: FieldResolver<'Mutation', 'adminReorderStation'> =
  async (_, args, ctx) => {
    const { prisma } = ctx
    
    const { lineId, stationId, newPosition } = args
    
    const stationPositionInLine = await prisma.stationPositionInLine.findFirst({
      where: {
        lineId,
        stationId,
      },
    })
    
    if (!stationPositionInLine) {
      throw new GraphQLError('station not found in line')
    }

    const currentPosition = stationPositionInLine.position

    // If the new position is greater than the current position,
    // shift the positions between the current and new position by -1
    if (newPosition > currentPosition) {
      await prisma.stationPositionInLine.updateMany({
        where: {
          lineId,
          position: {
            gte: currentPosition + 1,
            lte: newPosition,
          },
        },
        data: {
          position: {
            decrement: 1,
          },
        },
      })
    }

    // If the new position is less than the current position,
    // shift the positions between the new and current position by +1
    if (newPosition < currentPosition) {
      await prisma.stationPositionInLine.updateMany({
        where: {
          lineId,
          position: {
            gte: newPosition,
            lt: currentPosition,
          },
        },
        data: {
          position: {
            increment: 1,
          },
        },
      })
    }

    // Update the position of the moved station to the new position
    await prisma.stationPositionInLine.update({
      where: {
        id: stationPositionInLine.id,
      },
      data: {
        position: newPosition,
      },
    })
    
    // Delete the paths that are connected to the moved station
    await prisma.path.deleteMany({
      where: {
        OR: [
          {
            departureId: stationId,
          },
          {
            destinationId: stationId,
          },
          {
            stationsInPath: {
              some: {
                id: stationId,
              },
            },
          },
        ],
      },
    })

    return true
  }

export default adminReorderStation