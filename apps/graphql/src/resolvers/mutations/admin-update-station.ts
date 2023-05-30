import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

import { Context } from '../../context'

const locationLngLatToHoursMinutesString = (locationLngLat?: { lng: number, lat: number }) => {
  if (!locationLngLat) return null

  const { lng, lat } = locationLngLat
  const lngHours = Math.floor(lng)
  const lngMinutes = Math.floor((lng - lngHours) * 60)
  const latHours = Math.floor(lat)
  const latMinutes = Math.floor((lat - latHours) * 60)

  return `${lngHours}°${lngMinutes}'${lng < 0 ? 'W' : 'E'}, ${latHours}°${latMinutes}'${lat < 0 ? 'S' : 'N'}`
}

const validateLineIds = async (lineIds: string[], ctx: Context) => {
  if (!lineIds || !lineIds.length) return null

  const { prisma } = ctx

  const lines = await prisma.line.findMany({
    where: {
      id: {
        in: lineIds,
      },
    },
  })

  if (lines.length !== lineIds.length) {
    throw new GraphQLError('Invalid line ids')
  }

  return lines
}

const adminUpdateStation: FieldResolver<'Mutation', 'adminUpdateStation'> =
  async (_, args, ctx: Context) => {
    const {
      stationId, name, name_ar: nameAr, locationLngLat, lineIds,
    } = args
    const { prisma } = ctx

    if (!stationId)
      throw new GraphQLError('Station id was not provided')
    if (!name && !nameAr && !locationLngLat && !lineIds)
      throw new GraphQLError('No updates were provided')

    const station = await prisma.station.findUnique({
      where: {
        id: stationId,
      },
      include: {
        stationPositionInLine: true,
      },
    })

    if (!station) {
      throw new GraphQLError('Invalid station id')
    }

    const location = locationLngLatToHoursMinutesString(locationLngLat)
    const lines = await validateLineIds(lineIds, ctx) ?? []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: any = {}

    if (name) updates.name = name
    if (nameAr) updates.name_ar = nameAr
    if (location) updates.location = location
    if (lineIds) updates.lineIds = lines?.map((line) => line.id)

    await prisma.station.update({
      where: {
        id: stationId,
      },
      data: updates,
    })

    const bulkUpdates = []

    console.log(station.lineIds, lineIds)

    const idsSet = new Set([...station.lineIds, ...lineIds])

    for (const line of idsSet) {
      // is the station being added to the line?
      const isBeingAdded = !station.lineIds?.includes(line) && lineIds?.includes(line)

      if (isBeingAdded) {
        // set the station position in line to the last position

        // eslint-disable-next-line no-await-in-loop
        const lastPosition = await prisma.stationPositionInLine.findFirst({
          where: {
            lineId: line,
          },
          orderBy: {
            position: 'desc',
          },
        })
        
        const position = lastPosition?.position ?? -1
        
        bulkUpdates.push(
          prisma.stationPositionInLine.create({
            data: {
              lineId: line,
              stationId: station.id,
              position: position + 1,
            },
          }),
        )
        
        // add the station to the line
        bulkUpdates.push(
          prisma.line.update({
            where: {
              id: line,
            },
            data: {
              stationIds: {
                push: station.id,
              },
            },
          })
        )
      } 

      // is the station being removed from the line?
      const isBeingRemoved = station.lineIds?.includes(line) && !lineIds?.includes(line)
      if (isBeingRemoved){
        // decrement the position of all stations after it in the line and remove the station from the line
        const stationPositionInLine = station.stationPositionInLine.find((stationPositionInLine) => stationPositionInLine.lineId === line)

        if (!stationPositionInLine)
          continue

        const { position } = stationPositionInLine

        bulkUpdates.push(
          prisma.stationPositionInLine.updateMany({
            where: {
              lineId: line.id,
              position: {
                gt: position,
              },
            },
            data: {
              position: {
                decrement: 1,
              },
            },
          })
        )
        
        bulkUpdates.push(
          prisma.stationPositionInLine.delete({
            where: {
              id: stationPositionInLine.id,
            },
          }),
        )
        
        // eslint-disable-next-line no-await-in-loop
        const lineData = await prisma.line.findUnique({
          where: {
            id: line,
          },
        })

        if (!lineData)
          continue
        
        // remove the station from the line
        bulkUpdates.push(
          prisma.line.update({
            where: {
              id: line,
            },
            data: {
              stationIds: {
                set: lineData.stationIds.filter((stationId) => stationId !== station.id),
              },
            },
          })
        )
      }
    }

    await Promise.all(bulkUpdates)

    return true
  }

export default adminUpdateStation