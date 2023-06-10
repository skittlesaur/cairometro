import { FieldResolver } from 'nexus'
import { User, UserRole } from '@prisma/client'

const getVerificationRequests: FieldResolver<'Query', 'getVerificationRequests'> = async (
  _, args, ctx,
) => {
  const { prisma } = ctx

  // adminPermission(ctx)

  const take = args.take ?? 1

  const users = await prisma.user.findMany({
    where: {
      role: {
        in: [UserRole.SENIOR],
      },
    },
    skip: args.page * take,
    take: take,
  })

  return users
}

export default getVerificationRequests 