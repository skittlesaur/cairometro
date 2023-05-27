import { GraphQLError } from 'graphql/error'

import { Station } from '@prisma/client'
import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import findRoute from '../../lib/find-route'

const rideRouteByDate: FieldResolver<'Query', 'rideRouteByDate'> =
  async (_, args, ctx: Context) => {
    const { prisma } = ctx
    const { from, to, date } = args

    const dateObj = new Date(parseInt(date))

    const path = await findRoute(from, to, ctx)

    if (!path) throw new GraphQLError('No route found')

    // find departure schedule by date
    const departureSchedule = await prisma.schedule.findFirst({
      where: {
        departureStationId: path.stationsInPathIds[0],
        arrivalStationId: path.stationsInPathIds[1],
        departureTime: new Date(2023, 0, 1, dateObj.getHours(), dateObj.getMinutes(), 0),
      },
      include: {
        departureStation: true,
      },
    })

    if (!departureSchedule) throw new GraphQLError('No departure time found')

    const schedulePromises = []

    for (let i = 1; i < path.stationsInPathIds.length; i++) {
      schedulePromises.push(
        prisma.schedule.findFirst({
          where: {
            departureStationId: path.stationsInPathIds[i - 1],
            arrivalStationId: path.stationsInPathIds[i],
            departureTime: {
              gte: departureSchedule.departureTime,
            },
          },
          orderBy: {
            departureTime: 'asc',
          },
          include: {
            arrivalStation: true,
          },
        }),
      )
    }

    const schedules = await Promise.all(schedulePromises)

    // format the result to { station: { name, name_ar }, arrivalTime }
    const result: { station?: Partial<Station>, time?: Date }[] = [
      {
        station: departureSchedule.departureStation,
        time: departureSchedule.departureTime,
      },
      ...schedules.map((schedule) => ({
        station: schedule?.arrivalStation,
        time: schedule?.arrivalTime,
      })),
    ]

    return result
  }

export default rideRouteByDate
