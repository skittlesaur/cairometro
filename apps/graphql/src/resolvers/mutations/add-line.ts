import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

const addLine: FieldResolver<'Mutation', 'addLine'> =
  async (_, args, ctx) => {
    // adminPermission(ctx)

    const {
      name, color, name_ar: nameAr,
      priceZoneOne, priceZoneOneSeniors,
      priceZoneTwo, priceZoneTwoSeniors,
      priceZoneThree, priceZoneThreeSeniors,
    } = args
    
    if (!name || !nameAr || !color || !priceZoneOne || !priceZoneOneSeniors || !priceZoneTwo || !priceZoneTwoSeniors || !priceZoneThree || !priceZoneThreeSeniors)
      throw new GraphQLError('Invalid input')
    
    const { prisma } = ctx
    
    const line = await prisma.line.create({
      data: {
        name,
        name_ar: nameAr,
        color,
        pricing: {
          create: {
            priceZoneOne,
            priceZoneOneSeniors,
            priceZoneTwo,
            priceZoneTwoSeniors,
            priceZoneThree,
            priceZoneThreeSeniors,
          },
        },
      },
    })

    return line
  }
export default addLine