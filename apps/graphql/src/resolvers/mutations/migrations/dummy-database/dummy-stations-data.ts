import { Line, Station } from '@prisma/client'
import { FieldResolver } from 'nexus'

import secretPathPermission from '../../../../permissions/secret-path'

import { line1StationsData, line2StationsData, line3StationsData } from './stations-data'

const secretDummyStationsData: FieldResolver<'Mutation', 'secretDummyStationsData'> =
  async (_, args, ctx) => {
    secretPathPermission(ctx)
    const { prisma } = ctx

    await prisma.station.deleteMany()
    await prisma.line.deleteMany()

    const lines: Partial<Line>[] = [
      {
        name: 'Line 1',
        name_ar: 'الخط الأول',
        color: '#EA3347',
      },
      {
        name: 'Line 2',
        name_ar: 'الخط الثاني',
        color: '#1d6ac5',
      },
      {
        name: 'Line 3',
        name_ar: 'الخط الثالث',
        color: '#1dcc46',
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
    
    // update lines stations
    await prisma.line.update({
      where: {
        id: line1.id,
      },
      data: {
        stations: {
          connect: line1Stations.map((station: Station) => ({
            id: station.id,
          })),
        },
      },
    })

    await prisma.line.update({
      where: {
        id: line2.id,
      },
      data: {
        stations: {
          connect: line2Stations.map((station: Station) => ({
            id: station.id,
          })),
        },
      },
    })

    await prisma.line.update({
      where: {
        id: line3.id,
      },
      data: {
        stations: {
          connect: line3Stations.map((station: Station) => ({
            id: station.id,
          })),
        },
      },
    })


    return true
  }

export default secretDummyStationsData