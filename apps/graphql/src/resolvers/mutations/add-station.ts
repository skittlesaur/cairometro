import { Line, StationPositionInLine } from '@prisma/client'
import { FieldResolver } from 'nexus'

import convertLatLngToLocation from '../../lib/convert-lat-lng-to-location'

const addStation: FieldResolver<'Mutation', 'addStation'> =
  async (_, args, ctx) => {
    // adminPermission(ctx)
    
    const locationString = convertLatLngToLocation(args.location)

    const lines = await ctx.prisma.line.findMany({
      where: {
        id: {
          in: args.lineIds,
        },
      },
      select: {
        id: true,
        StationPositionInLine: {
          select: {
            position: true,
          },
        },
      },
    })
    
    const lineData = lines.map((line: Line & {StationPositionInLine: StationPositionInLine[]}) => ({
      id: line.id,
      maxPosition: line.StationPositionInLine.reduce(
        (max: number, { position }: {position: number}) => Math.max(max, position),
        0,
      ),
    }))

    const createdStation = await ctx.prisma.station.create({
      data: {
        name: args.name,
        name_ar: args.name_ar,
        location: locationString,
        lineIds: {
          set: args.lineIds,
        },
      },
    })
    
    await Promise.all(
      lineData.map(({ id, maxPosition }: {id: string, maxPosition: number}) => (
        ctx.prisma.stationPositionInLine.create({
          data: {
            lineId: id,
            stationId: createdStation.id,
            position: maxPosition + 1,
          },
        })
      )),
    )
    
    await ctx.prisma.line.updateMany({
      where: {
        id: {
          in: args.lineIds,
        },
      },
      data: {
        stationIds: {
          push: createdStation.id,
        },
      },
    })
    
    return createdStation
  }
export default addStation