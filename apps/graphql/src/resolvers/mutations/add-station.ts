import { FieldResolver } from 'nexus'

import adminPermission from '../../permissions/admin'

const addStation: FieldResolver<'Mutation', 'addStarion'> =
  async (_, args, ctx) => {
    adminPermission(ctx)


    const createdStation = await ctx.prisma.station.create({
      data: {
        name: args.name,
        name_ar: args.name_ar,
        location: args.location,
        lineIds: args.lineIds,
      },
    })

    return createdStation
  }
export default addStation