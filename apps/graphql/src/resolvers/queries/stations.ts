import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

const stations: FieldResolver<'Query', 'stations'> =
  async (_, args, ctx) => {
    const { prisma } = ctx
    const { page, take } = args

    const stations = await prisma.station.findMany({
      skip: (page - 1) * take,
      take,
      include: {
        lines: true,
        departureSchedules: true,
        arrivalSchedules: true,
      },
    })

    return stations
  }
  
export default stations
