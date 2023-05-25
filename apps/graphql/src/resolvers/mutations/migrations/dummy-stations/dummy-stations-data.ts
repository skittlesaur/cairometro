import { Line, Schedule, Station } from '@prisma/client'
import { FieldResolver } from 'nexus'

import secretPathPermission from '../../../../permissions/secret-path'

import { line1StationsData, line2StationsData, line3StationsData } from './stations-data'

const secretDummyStationsData: FieldResolver<'Mutation', 'secretDummyStationsData'> =
  async (_, args, ctx) => {
    secretPathPermission(ctx)
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
      prisma.line.create({
        data: {
          ...line,
          pricing: {
            create: {
              priceZoneOne: 5,
              priceZoneTwo: 10,
              priceZoneThree: 15,
              priceZoneOneSeniors: 2,
              priceZoneTwoSeniors: 5,
              priceZoneThreeSeniors: 10,
            },
          },
        }, 
      }),
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
    
    const stations2 = line2StationsData.map(async (station) => {
      const line1Station = line1Stations.find((line1Station: Station) => line1Station.name === station.name)

      const lineIds = [line2.id]

      if (line1Station) {
        lineIds.unshift(line1.id)
        // update line1Station
        await prisma.station.update({
          where: {
            id: line1Station.id,
          },
          data: {
            lineIds: {
              set: lineIds,
            },
          },
        })

        return
      }

      return {
        ...station,
        lineIds: {
          set: lineIds,
        },
      }
    })
      .filter(Boolean)

    await prisma.station.createMany({ data: await Promise.all(stations2) })
    const line2Stations = await prisma.station.findMany({
      where: {
        lineIds: {
          has: line2.id,
        },
      },
    })

    const stations3 = line3StationsData.map(async (station) => {
      const line1Station = line1Stations.find((line1Station: Station) => line1Station.name === station.name)
      const line2Station = line2Stations.find((line2Station: Station) => line2Station.name === station.name)

      const lineIds = [line3.id]

      if (line2Station) {
        lineIds.unshift(line2.id)
      }
      
      if (line1Station) {
        lineIds.unshift(line1.id)
      }
      
      if (lineIds.length > 1 ) {
        const id = line1Station?.id || line2Station?.id
        
        await prisma.station.update({
          where: {
            id,
          },
          data: {
            lineIds: {
              set: lineIds,
            },
          },
        })

        return
      }
      
      return {
        ...station,
        lineIds: {
          set: lineIds,
        },
      }
    })
      .filter(Boolean)
    
    await prisma.station.createMany({ data: await Promise.all(stations3) })
    const line3Stations = await prisma.station.findMany({
      where: {
        lineIds: {
          has: line3.id,
        },
      },
    })

    // simulate schedule
    // from 5 am till 12 am
    // each station takes 4 minutes
    // a train starts every 15 minutes

    const startTime = new Date(2023, 1, 1).setHours(5, 0, 0, 0)
    const endTime = new Date(2023, 1, 1).setHours(24, 0, 0, 0)
    const interval = 15 // minutes
    const durationPerStation = 4 // minutes

    let currentDepartureTime = startTime

    const schedules1: Partial<Schedule>[] = []
    const schedules2: Partial<Schedule>[] = []
    const schedules3: Partial<Schedule>[] = []

    while (currentDepartureTime < endTime) {
      let currentStationIndex = 0
      while (currentStationIndex < line1Stations.length - 2) {
        const departureTime = new Date(currentDepartureTime)
        const arrivalTime = new Date(currentDepartureTime + durationPerStation * 60000)

        const currentStation = line1Stations[currentStationIndex]
        const nextStation = line1Stations[currentStationIndex + 1]

        const currentStationRev = line1Stations[line1Stations.length - currentStationIndex - 1]
        const nextStationRev = line1Stations[line1Stations.length - currentStationIndex - 2]

        schedules1.push({
          departureTime,
          arrivalTime,
          departureStationId: currentStation.id,
          arrivalStationId: nextStation.id,
          lineId: line1.id,
        })

        schedules1.push({
          departureTime,
          arrivalTime,
          departureStationId: currentStationRev.id,
          arrivalStationId: nextStationRev.id,
          lineId: line1.id,
        })

        currentStationIndex++
        currentDepartureTime += interval * 60000
      }

      currentStationIndex = 0
      while (currentStationIndex < line2Stations.length - 2) {
        const departureTime = new Date(currentDepartureTime)
        const arrivalTime = new Date(currentDepartureTime + durationPerStation * 60000)

        const currentStation = line2Stations[currentStationIndex]
        const nextStation = line2Stations[currentStationIndex + 1]

        const currentStationRev = line1Stations[line1Stations.length - currentStationIndex - 1]
        const nextStationRev = line1Stations[line1Stations.length - currentStationIndex - 2]

        schedules2.push({
          departureTime,
          arrivalTime,
          departureStationId: currentStation.id,
          arrivalStationId: nextStation.id,
          lineId: line2.id,
        })

        schedules2.push({
          departureTime,
          arrivalTime,
          departureStationId: currentStationRev.id,
          arrivalStationId: nextStationRev.id,
          lineId: line2.id,
        })

        currentStationIndex++
        currentDepartureTime += interval * 60000
      }

      currentStationIndex = 0
      while (currentStationIndex < line3Stations.length - 2) {
        const departureTime = new Date(currentDepartureTime)
        const arrivalTime = new Date(currentDepartureTime + durationPerStation * 60000)

        const currentStation = line3Stations[currentStationIndex]
        const nextStation = line3Stations[currentStationIndex + 1]

        const currentStationRev = line1Stations[line1Stations.length - currentStationIndex - 1]
        const nextStationRev = line1Stations[line1Stations.length - currentStationIndex - 2]

        schedules3.push({
          departureTime,
          arrivalTime,
          departureStationId: currentStation.id,
          arrivalStationId: nextStation.id,
          lineId: line3.id,
        })

        schedules3.push({
          departureTime,
          arrivalTime,
          departureStationId: currentStationRev.id,
          arrivalStationId: nextStationRev.id,
          lineId: line3.id,
        })

        currentStationIndex++
        currentDepartureTime += interval * 60000
      }
    }

    await prisma.schedule.createMany({ data: schedules1 })
    await prisma.schedule.createMany({ data: schedules2 })
    await prisma.schedule.createMany({ data: schedules3 })

    const positionsInLine = [
      ...(line1StationsData.map((station, idx) => ({
        stationId: line1Stations.find((line1Station: Station) => line1Station.name === station.name)?.id,
        lineId: line1.id,
        position: idx,
      }))),
      ...(line2StationsData.map((station, idx) => ({
        stationId: line2Stations.find((line2Station: Station) => line2Station.name === station.name)?.id,
        lineId: line2.id,
        position: idx,
      }))),
      ...(line3StationsData.map((station, idx) => ({
        stationId: line3Stations.find((line3Station: Station) => line3Station.name === station.name)?.id,
        lineId: line3.id,
        position: idx,
      }))),
    ]

    await prisma.stationPositionInLine.createMany({ data: positionsInLine })

    return true
  }

export default secretDummyStationsData