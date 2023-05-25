import { PrismaClient } from '@prisma/client'

const test = async () => {
  const prisma = new PrismaClient()

  
  // const travelHour = args.travelTime.hour === 0 && args.travelTime.meridiem === 'pm' ? 12 : 0

  const travelTime = null

  // console.log(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())

  // travelTime = new Date(new Date().getFullYear(), new Date().getMonth(), 24, (3 - (new Date().getTimezoneOffset() / 60)), 44)

  console.log(travelTime)
  
  const firstStationSchedule = await prisma.schedule.findMany({
    where: {
      departureStationId: 'cli23topk0008v0ncpp88frfn',
      arrivalStationId: 'cli23topk0009v0nckghr6ffz',
      // departureTime: {
      //   gt: travelTime,
      // },      
      ...(travelTime !== null && {
        departureTime: {
          gte: travelTime,
        },
      }),
    },
    // select: {
    //   departureTime: true,
    //   arrivalTime: true,
    // },
  })

  console.log(firstStationSchedule)

}

test()

