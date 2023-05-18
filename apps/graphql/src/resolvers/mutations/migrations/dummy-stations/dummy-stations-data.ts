import { Line, Station } from '@prisma/client'
import { FieldResolver } from 'nexus'

import { line1StationsData, line2StationsData, line3StationsData } from './stations-data'

const secretDummyStationsData: FieldResolver<'Mutation', 'secretDummyStationsData'> =
  async (_, args, ctx) => {
    const { prisma } = ctx

    await prisma.schedule.deleteMany()
    await prisma.station.deleteMany()
    await prisma.line.deleteMany()

    const lines: Partial<Line>[] = [
      {
        name: 'Line 1',
        name_ar: 'الخط الأول',
      },
      {
        name: 'Line 2',
        name_ar: 'الخط الثاني',
      },
      {
        name: 'Line 3',
        name_ar: 'الخط الثالث',
      },
    ]

    const createLinePromises = lines.map((line) =>
      prisma.line.create({ data: line }),
    )

    const [line1, line2, line3] = await Promise.all(createLinePromises)
    // https://en.wikipedia.org/wiki/List_of_Cairo_Metro_stations

    const stations1: Partial<Station> & {lineIds: {set: string[]}}[] = line1StationsData.map((station) => ({
      ...station,
      lineIds: {
        set: [line1.id],
      },
    }))

    await prisma.station.createMany({ data: stations1 })
    const line1Stations = await prisma.station.findMany({
      where: {
        lineIds: {
          has: line1.id,
        },
      },
    })
    
    const stations2: Partial<Station> & {lineIds: {set: string[]}}[] = line2StationsData.map((station) => {
      const line1Station = line1Stations.find((line1Station: Station) => line1Station.name === station.name)

      const lineIds = [line2.id]

      if (line1Station) {
        lineIds.unshift(line1.id)
      }
      
      return {
        ...station,
        lineIds: {
          set: lineIds,
        },
      }
    })
    
    await prisma.station.createMany({ data: stations2 })
    const line2Stations = await prisma.station.findMany({
      where: {
        lineIds: {
          has: line2.id,
        },
      },
    })

    const stations3: Partial<Station> & {lineIds: {set: string[]}}[] = line3StationsData.map((station) => {
      const line1Station = line1Stations.find((line1Station: Station) => line1Station.name === station.name)
      const line2Station = line2Stations.find((line2Station: Station) => line2Station.name === station.name)

      const lineIds = [line3.id]

      if (line2Station) {
        lineIds.unshift(line2.id)
      }
      
      if (line1Station) {
        lineIds.unshift(line1.id)
      }
      
      return {
        ...station,
        lineIds: {
          set: lineIds,
        },
      }
    })
    
    await prisma.station.createMany({ data: stations3 })
    const line3Stations = await prisma.station.findMany({
      where: {
        lineIds: {
          has: line3.id,
        },
      },
    })

    // 5am
    const currentTime = new Date(new Date().setHours(5, 0, 0, 0))
    const endOfDay = new Date(new Date().setHours(23, 59, 59))
    const travelTimePerStation = 5 // minutes
    const trainWaitingTime = 3 // minutes
    const schedules = []
    let i = 0, j = 0, k = 0

    while (currentTime < endOfDay) {
      const station1 = line1Stations.find((station: Station) => station.name === line1StationsData[i].name)
      const nextStation1 = line1Stations.find((station: Station) => station.name === line1StationsData[i + 1].name)

      const station2 = line2Stations.find((station: Station) => station.name === line2StationsData[j].name)
      const nextStation2 = line2Stations.find((station: Station) => station.name === line2StationsData[j + 1].name)

      const station3 = line3Stations.find((station: Station) => station.name === line3StationsData[k].name)
      const nextStation3 = line3Stations.find((station: Station) => station.name === line3StationsData[k + 1].name)

      const arrivalTime = new Date(currentTime.getTime() + travelTimePerStation * 60 * 1000)
      
      schedules.push({
        lineId: line1.id,
        departureTime: currentTime,
        departureStationId: station1.id,
        arrivalTime,
        arrivalStationId: nextStation1.id,
      })
      
      schedules.push({
        lineId: line2.id,
        departureTime: currentTime,
        departureStationId: station2.id,
        arrivalTime,
        arrivalStationId: nextStation2.id,
      })
      
      schedules.push({
        lineId: line3.id,
        departureTime: currentTime,
        departureStationId: station3.id,
        arrivalTime,
        arrivalStationId: nextStation3.id,
      })
      
      currentTime.setMinutes(currentTime.getMinutes() + trainWaitingTime)
      i = line1Stations.length - 2 ? i = 0 : i++
      j = line2Stations.length - 2 ? j = 0 : j++
      k = line3Stations.length - 2 ? k = 0 : k++
    }

    await prisma.schedule.createMany({ data: schedules })

    return true
  }

export default secretDummyStationsData