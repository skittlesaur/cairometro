import { Path, Station } from '@prisma/client'

import { Context } from '../context'

interface Passengers {
  seniors: number
  adults: number
  children: number
}

const calculatePricing = async (
  path: { stationsInPath: Station[] } & Path, passengers: Passengers, ctx: Context,
) => {
  const { seniors, adults, children } = passengers

  if (!seniors && !adults && !children) return 0

  const stations = path?.stationsInPath

  if (!stations) throw new Error('No stations found in path')

  const countOfStationsInLine = getCountOfStationsInLine(stations)
  const pricingPerLine = await getLinesPricing(countOfStationsInLine, ctx)

  let total = 0
  Object.keys(pricingPerLine).forEach((line) => {
    const pricing = pricingPerLine[line]
    total += pricing.seniors * seniors
    total += pricing.adults * adults
    total += pricing.children * children
  })

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
    const nextLineId = nextLineIds?.find(id => prevLineIds.includes(id))

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

  const lineData = await prisma.line.findMany({
    where: {
      id: {
        in: Object.keys(lineStationsCount),
      },
    },
    select: {
      id: true,
      pricing: true,
    },
  })

  const linePricing = lineData.map(line => ({
    lineId: line.id,
    ...line.pricing,
  }))

  const pricingPerLine: {
    [key: string]: {
      seniors: number
      adults: number
      children: number
    }
  } = {}

  Object.keys(lineStationsCount).forEach((line) => {
    const linePricingForLine = linePricing.find((pricing) => pricing.lineId === line)
    if (!linePricingForLine) throw new Error('No pricing found for line')

    if (lineStationsCount[line] <= 9) {
      pricingPerLine[line] = {
        seniors: linePricingForLine.priceZoneOneSeniors,
        adults: linePricingForLine.priceZoneOne,
        children: 0,
      }

      return
    }

    if (lineStationsCount[line] <= 16) {
      pricingPerLine[line] = {
        seniors: linePricingForLine.priceZoneTwoSeniors,
        adults: linePricingForLine.priceZoneTwo,
        children: 0,
      }

      return
    }

    if (lineStationsCount[line] > 16) {
      pricingPerLine[line] = {
        seniors: linePricingForLine.priceZoneThreeSeniors,
        adults: linePricingForLine.priceZoneThree,
        children: 0,
      }

      return
    }
  })

  return pricingPerLine
}

export default calculatePricing