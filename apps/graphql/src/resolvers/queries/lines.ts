import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'

const stations: FieldResolver<'Query', 'lines'> =
  async (_, args, ctx: Context) => {
    const { prisma } = ctx

    const lines = await prisma.line.findMany()

    return lines
  }

export default stations
