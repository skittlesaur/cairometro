import { FieldResolver } from 'nexus'

import adminPermission from '../../permissions/admin'


const updateVerificationStatus: FieldResolver< 'Mutation', 'updateVerificationStatus' > = async(_, args, ctx)=>{
  adminPermission(ctx)

  const { prisma } = ctx

  await prisma.user.update({
    where: {
      id: args.userId,
    },
    data: {
      documentVerified: args.documentVerified.verificationstatus,
    },
  })

  return true
}

export default updateVerificationStatus