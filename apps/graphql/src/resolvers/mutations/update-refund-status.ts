import { arg, FieldResolver } from 'nexus'

import adminPermission from '../../permissions/admin'
import sendEmail from '../../lib/send-email'
import { EmailTemplate } from '../../lib/send-email'
import { EmailVariables } from '../../lib/send-email'

const updateRefundStatus: FieldResolver< 'Mutation', 'updateRefundStatus' > = async(_, args, ctx)=>{
  const { prisma } = ctx

  // adminPermission(ctx)
  console.log(args)
  const refund = await prisma.refund.update({
    where: {
      id: args.refundRequestId,
    },
    data: {
      status: args.status.refundStatus,
    },
  })
  const user = await prisma.user.findFirst({
    where: {
      id: refund.userId,
    },
  })
  console.log(refund)
  console.log(user)
  // await sendEmail<EmailTemplate.REFUND_REQUEST_RESPONSE>(user.email, 'Refund request response', EmailTemplate.REFUND_REQUEST_RESPONSE, {
  //   name: user.name,
  //   status: args.status.refundStatus,
  //   from: 
  // })
  return true
}

export default updateRefundStatus