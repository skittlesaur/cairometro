import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'

const paginateStationsSchedule: FieldResolver<'Query', 'paginateStationsSchedule'> =
  async (_, args, ctx: Context) => {
    const { prisma } = ctx

    

  }

export default paginateStationsSchedule