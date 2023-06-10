import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import calculatePricing from '../../lib/calculate-pricing'
import { getScheduleBasedOnGivenTime } from '../../lib/calculate-schedule-based-on-time'
import calculateTravelDuration from '../../lib/calculate-travel-duration'
import convertLocationToLatLng from '../../lib/convert-location-to-lat-lng'
import findRoute from '../../lib/find-route'


const RESPONSE_RECOMMENDATIONS_COUNT = 5

const getMostSelling = async (ctx: Context) => {
  const userTickets = await ctx.prisma.userTickets.findMany()

  const stationCombinationCountMap = new Map()

  for (const ticket of userTickets) {
    const fromStationId = ticket.fromId
    const toStationId = ticket.toId
    const combinationKey = [fromStationId, toStationId].join(',')

    if (stationCombinationCountMap.has(combinationKey)) {
      stationCombinationCountMap.set(
        combinationKey,
        stationCombinationCountMap.get(combinationKey) + 1
      )
    } else {
      stationCombinationCountMap.set(combinationKey, 1)
    }
  }

  const sortedStationCombinations = Array.from(stationCombinationCountMap.entries()).sort(
    (a, b) => b[1] - a[1]
  )

  return sortedStationCombinations.map(i => i[0])
}

const getUserTickets = async (ctx: Context) => {
  if (!ctx.user) return []

  const userTickets = await ctx.prisma.userTickets.findMany({
    where: {
      userId: ctx.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })
  
  return userTickets.map(i => `${i.fromId},${i.toId}`)
}

const getUserSearchHistory = async (ctx: Context) => {
  if (!ctx.user) return []
  
  const searchHistory = await ctx.prisma.searchHistory.findMany({
    where: {
      userId: ctx.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  })
  
  return searchHistory.map(i => `${i.fromId},${i.toId}`)
}

const getRandomStations = async (ctx: Context) => {
  const stations = await ctx.prisma.station.findMany()
  const randomStations: string[] = []

  while (randomStations.length < RESPONSE_RECOMMENDATIONS_COUNT) {
    const fromIndex = Math.floor(Math.random() * stations.length)
    const toIndex = Math.floor(Math.random() * stations.length)
    
    if (fromIndex === toIndex) continue

    const fromStation = stations[fromIndex]
    const toStation = stations[toIndex]

    const key = `${fromStation.id},${toStation.id}`

    if (!randomStations.includes(key)) {
      randomStations.push(key)
    }
  }

  return randomStations
}

const recommendations: FieldResolver<'Query', 'recommendations'> =
  async (_, args, ctx: Context) => {
    const [
      mostSelling,
      userTickets,
      searchHistory,
      randomStations,
    ] = await Promise.all([
      getMostSelling(ctx),
      getUserTickets(ctx),
      getUserSearchHistory(ctx),
      getRandomStations(ctx),
    ])

    const recommendationList = [
      ...mostSelling,
      ...userTickets,
      ...searchHistory,
      ...randomStations,
    ]

    const randomRecommendations: string[] = []
    const recommendationsCount = Math.min(RESPONSE_RECOMMENDATIONS_COUNT, recommendationList.length)

    while (randomRecommendations.length < recommendationsCount) {
      const randomIndex = Math.floor(Math.random() * recommendationList.length)
      const randomRecommendation = recommendationList[randomIndex]

      if (!randomRecommendations.includes(randomRecommendation)) {
        randomRecommendations.push(randomRecommendation)
      }
    }

    // calculate the routes for the recommendations
    const routes = await Promise.all(
      randomRecommendations.map(async (r) => {
        const [departure, destination] = r.split(',')
        return await findRoute(departure, destination, ctx)
      })
    )

    const pricing = await Promise.all(
      randomRecommendations.map(async (_, index) => {
        const passengers = {
          adults: 1,
          seniors: 0,
          children: 0,
        }
        return await calculatePricing(routes[index], passengers, ctx)
      })
    )

    const schedule = await Promise.all(
      randomRecommendations.map(async (r, index) => {
        const locations = routes[index].stationsInPath.map((station) => convertLocationToLatLng(station.location))

        const rideDuration = Math.ceil(
          locations.reduce((acc, location, index) => {
            if (index === 0) return acc
            const previousLocation = locations[index - 1]
            const duration = calculateTravelDuration(previousLocation, location)
            return acc + duration
          }, 0)
        )

        const travelTime = new Date()
        travelTime.setHours(travelTime.getHours() + 2)

        return getScheduleBasedOnGivenTime(rideDuration, travelTime, 1, 1)
      })
    )

    return routes.map((route, index) => ({
      from: route.stationsInPath[0],
      to: route.stationsInPath[route.stationsInPath.length - 1],
      noOfStationsOnPath: route.stationsInPath.length,
      price: pricing[index],
      schedule: schedule[index],
    }))
  }
  
export default recommendations