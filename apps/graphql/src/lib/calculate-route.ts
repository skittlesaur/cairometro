import { Station } from '@prisma/client'

import { getScheduleBasedOnGivenTime } from './calculate-schedule-based-on-time'
import calculateTravelDuration from './calculate-travel-duration'
import convertLocationToLatLng from './convert-location-to-lat-lng'

const calculateRoute = (stations: Station[], duration: number, departure: Date) => {
  const route: { station: Station, time: Date }[] = []

  let currentTime = new Date(departure)
  for (let i = 0; i < stations.length - 1; i++) {
    const currentStation = stations[i]
    const nextStation = stations[i + 1]
    const currentLocation = convertLocationToLatLng(currentStation.location)
    const nextLocation = convertLocationToLatLng(nextStation.location)
    const duration = calculateTravelDuration(currentLocation, nextLocation)
    const arrivalTime = getScheduleBasedOnGivenTime(duration, currentTime, 1, 0)[0].arrivalTime
    route.push({ station: currentStation, time: currentTime })
    currentTime = new Date(arrivalTime)
  }

  route.push({ station: stations[stations.length - 1], time: currentTime })

  return route
}

export default calculateRoute