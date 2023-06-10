import { TicketType } from '@prisma/client'
import { arg, FieldResolver } from 'nexus'
import Stripe from 'stripe'

import adminPermission from '../../permissions/admin'

const updateRefundStatus: FieldResolver< 'Mutation', 'updateRefundStatus' > = async(_, args, ctx)=>{
  const { prisma } = ctx

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2022-11-15',
  })
  
  adminPermission(ctx)
  await prisma.refund.update({
    where: {
      id: args.refundRequestId,
    },
    data: {
      status: args.status.refundStatus,
    },
  })

  const request = await prisma.refund.findUnique({
    where: {
      id: args.refundRequestId,
    },
  })
  if (args.status.refundStatus === 'ACCEPTED' && request.ticketType === TicketType.TICKET){

    const purchase = await prisma.userTickets.findUnique({
      where: {
        id: request.referenceId,
      },
    })

    await stripe.refunds.create({
      payment_intent: purchase.paymentId,
    })

  }

  return true
}

export default updateRefundStatus