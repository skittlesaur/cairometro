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
    })
    
    if (!station){
      throw new GraphQLError('Invalid station id')
    }

    const location = locationLngLatToHoursMinutesString(locationLngLat)
    const lines = await validateLineIds(lineIds, ctx)

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

    return true
  }

export default adminUpdateStation