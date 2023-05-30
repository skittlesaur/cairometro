import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

import { Context } from '../../context'

const adminUpdateLine: FieldResolver<'Mutation', 'adminUpdateLine'> =
  async (_, args, ctx: Context) => {
    const {
      lineId, name, color, name_ar: nameAr,
      priceZoneOne, priceZoneOneSeniors,
      priceZoneTwo, priceZoneTwoSeniors,
      priceZoneThree, priceZoneThreeSeniors,
    } = args

    if (!lineId)
      throw new GraphQLError('Line id was not provided')

    if (!name && !nameAr && !color && !priceZoneOne && !priceZoneOneSeniors && !priceZoneTwo && !priceZoneTwoSeniors && !priceZoneThree && !priceZoneThreeSeniors)
      throw new GraphQLError('No updates were provided')

    const { prisma } = ctx

    const line = await prisma.line.findUnique({
      where: {
        id: lineId,
      },
    })

    if (!line) {
      throw new GraphQLError('Invalid line id')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lineUpdates: any = {}
    
    if (name) lineUpdates.name = name
    if (color) lineUpdates.color = color
    
    const lineUpdate = prisma.line.update({
      where: {
        id: lineId,
      },
      data: lineUpdates,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const priceUpdates: any = {}
    
    if (priceZoneOne) priceUpdates.priceZoneOne = priceZoneOne
    if (priceZoneOneSeniors) priceUpdates.priceZoneOneSeniors = priceZoneOneSeniors
    if (priceZoneTwo) priceUpdates.priceZoneTwo = priceZoneTwo
    if (priceZoneTwoSeniors) priceUpdates.priceZoneTwoSeniors = priceZoneTwoSeniors
    if (priceZoneThree) priceUpdates.priceZoneThree = priceZoneThree
    if (priceZoneThreeSeniors) priceUpdates.priceZoneThreeSeniors = priceZoneThreeSeniors
    
    const priceUpdate = prisma.pricing.update({
      where: {
        id: line.pricingId,
      },
      data: priceUpdates,
    })

    await Promise.all([lineUpdate, priceUpdate])

    return true
  }

export default adminUpdateLine