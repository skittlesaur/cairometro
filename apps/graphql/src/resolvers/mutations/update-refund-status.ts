import { arg, FieldResolver } from 'nexus'

import adminPermission from '../../permissions/admin'
import sendEmail from '../../lib/send-email'
import { EmailTemplate } from '../../lib/send-email'
import { EmailVariables } from '../../lib/send-email'
import capitalizeFirstLetters from '../../lib/capitalize-first-letters'

const updateRefundStatus: FieldResolver< 'Mutation', 'updateRefundStatus' > = async(_, args, ctx)=>{
  const { prisma } = ctx

  // adminPermission(ctx)
  var statusColor = 'green'
  if(args.status.refundStatus == 'REJECTED') statusColor = 'red'
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
  const ticket = await prisma.userTickets.findFirst({
    where: {
      id: user.referenceId,
    },
    include: {
      from: true,
      to: true,
    }
  })
  await sendEmail<EmailTemplate.REFUND_REQUEST_RESPONSE>(user.email, 'Refund request response', EmailTemplate.REFUND_REQUEST_RESPONSE, {
    name: user.name,
    status: capitalizeFirstLetters(args.status.refundStatus),
    statusColor: statusColor,
    from: ticket.from.name,
    to: ticket.to.name,
    date: `${ticket.date.toLocaleDateString(
      'en-US',
      {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
      },
    )} at ${ticket.date.toLocaleTimeString(
      'en-US',
      {
        hour: 'numeric',
        minute: 'numeric',
      },
    )}`,
    refundAmount: `${ticket.price.toFixed(2)} EGP`,
  })
  return true
}

export default updateRefundStatus