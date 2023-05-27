import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import calculatePricing from '../../lib/calculate-pricing'
import findRoute from '../../lib/find-route'

const paginateStationsSchedule: FieldResolver<'Query', 'paginateStationsSchedule'> =
  async (_, args, ctx: Context) => {
    const { prisma } = ctx

    const from = args.from
    const to = args.to

    const departureStation = await prisma.station.findUnique({
      where: {
        id: from,
      },
    })

    const arrivalStation = await prisma.station.findUnique({
      where: {
        id: to,
      },
    })

    if (!departureStation || !arrivalStation){
      throw new GraphQLError('destination or arrival station are unavailable')
    }

    let travelTime = null

    if (args.travelTime?.hour || args.travelTime?.minute){

      if (args.travelTime.hour > 12 || args.travelTime.hour < 1 || args.travelTime.minute > 59 || args.travelTime.minute < 0 )
        throw new GraphQLError('The times entered for the ride are invalid')     
      
      const meridiem = args.travelTime.meridiem


      if (meridiem !== 'am' && meridiem !== 'pm') throw new GraphQLError('invalid meridiem value')

      const travelHour = meridiem === 'pm' ? args.travelTime.hour === 12 ? 0 : args.travelTime.hour + 12 : args.travelTime.hour

      travelTime = new Date(2023, 0, 1, (travelHour - (new Date().getTimezoneOffset() / 60)), args.travelTime.minute ?? 0, 0)
    }

    const take = args.take ?? 2
    const page = take * args.page ?? 0
   
    const path = await findRoute(from, to, ctx)

    const firstStationSchedule = await prisma.schedule.findMany({
      where: {
        departureStationId: from,
        arrivalStationId: path.stationsInPathIds[1],
        ...(travelTime !== null && {
          departureTime: {
            gte: travelTime,
          },
        }),
      },
      select: {
        departureTime: true,
        arrivalTime: true,
      },
      skip: page,
      take: take,
    })

    const stationBeforeLastId = path.stationsInPathIds[path.stationsInPathIds.length - 2]
    const lastStationId = path.stationsInPathIds[path.stationsInPathIds.length - 1]

    const price = await calculatePricing(path, args.passengers, ctx)

    if (stationBeforeLastId === from && lastStationId === to) {

      const schedule = []
      for (let i = 0; i < firstStationSchedule.length; i++) {
        schedule.push({ departureTime: firstStationSchedule[i].departureTime, arrivalTime: firstStationSchedule[i].arrivalTime })
      }

      return {
        from: departureStation,
        to: arrivalStation,
        noOfStationsOnPath: path.stationsInPathIds.length,
        price, // should calculate price based on number of stations but for now it's 5
        schedule: schedule,
      }

    }

    let schedulesSkippedCount = null
    if (travelTime){
      schedulesSkippedCount = await prisma.schedule.count({
        where: {
          departureStationId: from,
          arrivalStationId: path.stationsInPathIds[1],
          ...(({
            departureTime: {
              lt: travelTime,
            },
          })),
        },
        skip: page,
        take: take,
      })
    }

    const arrivalTime = await prisma.schedule.findMany({
      where: {
        departureStationId: stationBeforeLastId,
        arrivalStationId: lastStationId,
      },
      select: {
        arrivalTime: true,
      },
      skip: page + (schedulesSkippedCount ?? 0),
      take: take,
    })

    if (arrivalTime.length === 0){
      throw new GraphQLError('There are no more rides for this path today')
    }

    const schedule = []
    for (let i = 0; i < firstStationSchedule.length; i++) {
      schedule.push({ departureTime: firstStationSchedule[i].departureTime, arrivalTime: arrivalTime[i].arrivalTime })
    }

    return {
      from: departureStation,
      to: arrivalStation,
      noOfStationsOnPath: path.stationsInPathIds.length,
      schedule: schedule,
      price,
    }
  }

export default paginateStationsSchedule
