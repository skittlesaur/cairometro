import { GraphQLError } from 'graphql/error'

import { Path } from '@prisma/client'
import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import calculatePricing from '../../lib/calculate-pricing'
import convertLocationToLatLng from '../../lib/convert-location-to-lat-lng'
import findRoute from '../../lib/find-route'

const dayStart = new Date(2023, 0, 1, 5, 0, 0)
const dayEnd = new Date(2023, 0, 1, 23, 0, 0)

interface Location {
  lat: number
  lng: number
}

const calculateDuration = (station1Location: Location, station2Location: Location, metroSpeedRange: [number, number]) => {
  const speed = Math.floor(Math.random() * (metroSpeedRange[1] - metroSpeedRange[0] + 1) + metroSpeedRange[0])

  // calculate distance between two stations in km
  const distance = Math.sqrt(Math.pow(station1Location.lat - station2Location.lat, 2) + Math.pow(station1Location.lng - station2Location.lng, 2)) * 111.2
  const duration = distance / speed

  // duration in minutes
  return duration * 60
}

const getScheduleBasedOnGivenTime = (path: Path, travelDuration: number, time: Date, page: number, take: number) => {
  const waitingPerStationRange = [5, 10]
  const stationDepartureRange = [15, 20]

  const currentTime = new Date(time < dayStart ? dayStart.getTime() : time > dayEnd ? dayEnd.getTime() : time)
  // pagination offset
  currentTime.setMinutes(currentTime.getMinutes() + travelDuration * page * take)

  const scheduleTimes: {departureTime: Date, arrivalTime: Date}[] = []

  while (scheduleTimes.length < take) {
    const waitingTime = Math.floor(Math.random() * (waitingPerStationRange[1] - waitingPerStationRange[0] + 1) + waitingPerStationRange[0])
    const departureTime = new Date(currentTime.getTime() + waitingTime * 60 * 1000)
    const arrivalTime = new Date(
      departureTime.getTime() + travelDuration * 60 * 1000 + waitingTime * 60 * 1000
    )

    // check if it's the end of the day
    if (departureTime > dayEnd) {
      // reset the time to the start of the day
      currentTime.setHours(dayStart.getHours())
      currentTime.setMinutes(dayStart.getMinutes())
      currentTime.setSeconds(dayStart.getSeconds())
      continue
    }

    currentTime.setHours(departureTime.getHours())
    const minutes = Math.floor(Math.random() * (stationDepartureRange[1] - stationDepartureRange[0] + 1) + stationDepartureRange[0])
    currentTime.setMinutes(departureTime.getMinutes() + minutes)
    currentTime.setSeconds(departureTime.getSeconds())

    // check if the schedule is available
    scheduleTimes.push({ departureTime: departureTime, arrivalTime: arrivalTime })
  }

  return scheduleTimes
}

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

    const take = args.take ?? 2
    const page = take * args.page ?? 0

    const path = await findRoute(from, to, ctx)

    const locations = path.stationsInPath.map((station) => convertLocationToLatLng(station.location))

    // range of metro speed in km/h
    const metroSpeed: [number, number] = [30, 40]
    // ride duration in minutes
    const rideDuration = Math.ceil(
      locations.reduce((acc, location, index) => {
        if (index === 0) return acc
        const previousLocation = locations[index - 1]
        const duration = calculateDuration(previousLocation, location, metroSpeed)
        return acc + duration
      }, 0)
    )

    if (args.travelTime?.hour || args.travelTime?.minute){

      if (args.travelTime.hour > 12 || args.travelTime.hour < 1 || args.travelTime.minute > 59 || args.travelTime.minute < 0 )
        throw new GraphQLError('The times entered for the ride are invalid')

      const meridiem = args.travelTime.meridiem


      if (meridiem !== 'am' && meridiem !== 'pm') throw new GraphQLError('invalid meridiem value')

      
      const travelHour = meridiem === 'pm' ? args.travelTime.hour === 12 ? 0 : args.travelTime.hour + 12 : args.travelTime.hour
      const maxAdd = 40
      const maxSub = 20
      const minutesOffset = args.travelTime.minute ?? Math.random() > 0.5 ? Math.floor(Math.random() * maxAdd) : -Math.floor(Math.random() * maxSub)
      const travelTime = new Date(2023, 0, 1, travelHour, minutesOffset, 0)

      return {
        from: departureStation,
        to: arrivalStation,
        noOfStationsOnPath: path.stationsInPath.length,
        price: calculatePricing(path, args.passengers, ctx),
        schedule: getScheduleBasedOnGivenTime(path, rideDuration, travelTime, take, page),
      }
    }

    return {
      from: departureStation,
      to: arrivalStation,
      noOfStationsOnPath: path.stationsInPath.length,
      price: calculatePricing(path, args.passengers, ctx),
      schedule: getScheduleBasedOnGivenTime(path, rideDuration, dayStart, take, page),
    }
  }

export default paginateStationsSchedule
