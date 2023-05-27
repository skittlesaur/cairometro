import { GraphQLError } from 'graphql/error'

import { Schedule, Station } from '@prisma/client'
import { FieldResolver } from 'nexus'

import secretPathPermission from '../../../../permissions/secret-path'

const generateScheduleArray = (stations: Station[], lineId: string, startTime: Date, endTime: Date, durationPerStation: number, interval: number) => {
  const schedule: Partial<Schedule>[] = []
  for (let i = 0; i < stations.length - 1; i += 1) {
    const currentTime = new Date(startTime)

    while (currentTime < endTime) {
      const departureTime = new Date(currentTime)
      const arrivalTime = new Date(currentTime.getTime() + durationPerStation * 60000)

      const params = {
        lineId,
        departureTime,
        departureStationId: stations[i].id,
        arrivalTime,
        arrivalStationId: stations[i + 1].id,
      }

      schedule.push(params)

      currentTime.setMinutes(currentTime.getMinutes() + interval)
    }
  }

  return schedule
}

const secretDummySchedule: FieldResolver<'Mutation', 'secretDummySchedule'> =
  async (_, args, ctx) => {
    secretPathPermission(ctx)
    const { prisma } = ctx
    
    const [line1, line2, line3] = await Promise.all([
      prisma.line.findFirst({ where: { name: 'Line 1' } }), prisma.line.findFirst({ where: { name: 'Line 2' } }), prisma.line.findFirst({ where: { name: 'Line 3' } }),
    ])
    
    if (!line1 || !line2 || !line3) {
      throw new GraphQLError('Lines not found')
    }
    
    const [line1Stations, line2Stations, line3Stations] = await Promise.all([
      prisma.station.findMany({ where: { lineIds: { has: line1.id } } }), prisma.station.findMany({ where: { lineIds: { has: line2.id } } }), prisma.station.findMany({ where: { lineIds: { has: line3.id } } }),
    ])

    const startTime = new Date(2023, 0, 1, 5, 0, 0, 0)
    const endTime = new Date(2023, 0, 1, 24, 0, 0, 0)
    const interval = 15 // minutes
    const durationPerStation = 4 // minutes

    const schedules1 = generateScheduleArray(line1Stations, line1.id, startTime, endTime, durationPerStation, interval)
    const schedules2 = generateScheduleArray(line2Stations, line2.id, startTime, endTime, durationPerStation, interval)
    const schedules3 = generateScheduleArray(line3Stations, line3.id, startTime, endTime, durationPerStation, interval)

    // split into chunks
    const chunkSize = 100
    const chunkedSchedules = []
    const schedules = [...schedules1, ...schedules2, ...schedules3]

    for (let i = 0; i < schedules.length; i += chunkSize) {
      chunkedSchedules.push(schedules.slice(i, i + chunkSize))
    }

    for (let i = 0; i < chunkedSchedules.length; i += 1) {
      console.log(`Creating chunk ${i + 1} of ${chunkedSchedules.length} (size: ${chunkedSchedules[i].length} schedules)`)
      // eslint-disable-next-line no-await-in-loop
      await prisma.schedule.createMany({
        data: chunkedSchedules[i],
      })
    }

    console.log('[✓] Schedules created successfully')
    
    return true
  }
  
export default secretDummySchedule