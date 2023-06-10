import { Path, Station, UserRole } from '@prisma/client'

import { Context } from '../context'

const AREA_LIMITS: { [key: string]: number } = {
  ONE_AREA: 9,
  TWO_AREAS: 16,
  THREE_AREAS: Infinity,
}

interface Passengers {
  seniors: number
  adults: number
  children: number
}

const calculatePricing = async (
  path: { stationsInPath: Station[] } & Path, passengers: Passengers, ctx: Context,
) => {
  const { user } = ctx
  let { seniors, adults } = passengers
  const { children } = passengers

  if (!seniors && !adults && !children) return 0

  const stations = path?.stationsInPath

  if (!stations) throw new Error('No stations found in path')

  const countOfStationsInLine = getCountOfStationsInLine(stations)
  const pricing = await getLinesPricing(countOfStationsInLine, ctx)
  
  if (user) {
    const userSubscription = await ctx.prisma.subscriptions.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        expiresAt: 'desc',
      },
    })

    if (userSubscription) {
      const { expiresAt } = userSubscription
      const now = new Date()
      if (expiresAt > now && AREA_LIMITS[userSubscription.tier] > stations.length) {
        if (user?.role === UserRole.ADULT)
          adults--
        else if (user?.role === UserRole.SENIOR)
          seniors--
      }
    }
  }
  
  const total = pricing.adults * adults + pricing.seniors * seniors + pricing.children * children
  return total
}

const getCountOfStationsInLine = (stations: Station[]) => {
  const lineStationsCount: { [key: string]: number } = {}

  for (let i = 0; i < stations.length; i++) {
    const station = stations[i]
    const lineIds = station.lineIds
    if (lineIds.length === 1) {
      const lineId = lineIds[0]
      if (lineStationsCount[lineId]) {
        lineStationsCount[lineId]++
      } else {
        lineStationsCount[lineId] = 1
      }
      continue
    }

    // if the station has more than one line, we need to figure out which line the passenger is taking
    const nextStation = stations[i + 1]
    const prevStation = stations[i - 1]
    const nextLineIds = nextStation?.lineIds
    const prevLineIds = prevStation?.lineIds
    const nextLineId = nextLineIds?.find(id => prevLineIds?.includes(id))

    if (nextLineId) {
      if (lineStationsCount[nextLineId]) {
        lineStationsCount[nextLineId]++
      } else {
        lineStationsCount[nextLineId] = 1
      }
    }
  }

  return lineStationsCount
}

const getLinesPricing = async (lineStationsCount: { [key: string]: number }, ctx: Context) => {
  const { prisma } = ctx

  const price = await prisma.line.findFirst({
    where: {
      id: {
        in: Object.keys(lineStationsCount),
      },
    },
    select: {
      id: true,
      pricing: true,
    },
    orderBy: {
      pricing: {
        priceZoneOne: 'desc',
      },
    },
  })

  if (!price) throw new Error('No pricing found')

  const totalStations = Object.values(lineStationsCount).reduce((acc, curr) => acc + curr, 0)

  if (totalStations <= 9) {
    return {
      adults: price.pricing.priceZoneOne,
      seniors: price.pricing.priceZoneOneSeniors,
      children: 0,
    }
  }

  if (totalStations <= 16) {
    return {
      adults: price.pricing.priceZoneTwo,
      seniors: price.pricing.priceZoneTwoSeniors,
      children: 0,
    }
  }

  return {
    adults: price.pricing.priceZoneThree,
    seniors: price.pricing.priceZoneThreeSeniors,
    children: 0,
  }
}

export default calculatePricing