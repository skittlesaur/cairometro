import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import calculatePricing from '../../lib/calculate-pricing'
import { dayStart, getScheduleBasedOnGivenTime } from '../../lib/calculate-schedule-based-on-time'
import calculateTravelDuration from '../../lib/calculate-travel-duration'
import convertLocationToLatLng from '../../lib/convert-location-to-lat-lng'
import findRoute from '../../lib/find-route'

const paginateStationsSchedule: FieldResolver<'Query', 'paginateStationsSchedule'> =
  async (_, args, ctx: Context) => {
    const { prisma, user } = ctx

    const { from, to, date } = args
    console.log(date)

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

    const take = args.take ?? 2
    const page = take * args.page ?? 0

    const path = await findRoute(from, to, ctx)

    const locations = path.stationsInPath.map((station) => convertLocationToLatLng(station.location))

    // ride duration in minutes
    const rideDuration = Math.ceil(
      locations.reduce((acc, location, index) => {
        if (index === 0) return acc
        const previousLocation = locations[index - 1]
        const duration = calculateTravelDuration(previousLocation, location)
        return acc + duration
      }, 0)
    )
    
    let travelTime = dayStart

    if (args.travelTime?.hour || args.travelTime?.minute){

      if (args.travelTime.hour > 12 || args.travelTime.hour < 1 || args.travelTime.minute > 59 || args.travelTime.minute < 0 )
        throw new GraphQLError('The times entered for the ride are invalid')

      const meridiem = args.travelTime.meridiem


      if (meridiem !== 'am' && meridiem !== 'pm') throw new GraphQLError('invalid meridiem value')

      
      let travelHour = meridiem === 'pm' ? args.travelTime.hour === 12 ? 0 : args.travelTime.hour + 12 : args.travelTime.hour
      const maxAdd = 40
      const maxSub = 20
      let minutesOffset = args.travelTime.minute ?? Math.random() > 0.5 ? Math.floor(Math.random() * maxAdd) : -Math.floor(Math.random() * maxSub)
      if (minutesOffset < 0) {
        travelHour = travelHour - 1
        minutesOffset = 60 + minutesOffset
      }

      const travelDate = new Date(date)
      travelDate.setHours(travelHour)
      travelDate.setMinutes(minutesOffset)
      travelDate.setSeconds(0)
      travelDate.setMilliseconds(0)
      travelTime = travelDate
      
      if (user) {
        await prisma.searchHistory.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
            from: {
              connect: {
                id: departureStation.id,
              },
            },
            to: {
              connect: {
                id: arrivalStation.id,
              },
            },
            departureTime: travelTime,
          },
        })
      }
      
    }

    return {
      from: departureStation,
      to: arrivalStation,
      noOfStationsOnPath: path.stationsInPath.length,
      price: calculatePricing(path, args.passengers, ctx),
      schedule: getScheduleBasedOnGivenTime(rideDuration, travelTime, take, page),
    }
  }

export default paginateStationsSchedule
