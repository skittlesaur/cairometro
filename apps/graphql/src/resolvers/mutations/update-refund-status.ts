import { GraphQLError } from 'graphql/error'

import { TicketType } from '@prisma/client'
import { FieldResolver } from 'nexus'
import Stripe from 'stripe'

import { refundSubscription } from '../../lib/refund-subscription'
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
  if (args.status.refundStatus === 'ACCEPTED'){

    if (request.ticketType === TicketType.TICKET){

      try {
        const purchase = await prisma.userTickets.findUnique({
          where: {
            id: request.referenceId,
          },
        })

        await stripe.refunds.create({
          payment_intent: purchase.paymentId,
        })
      }
      catch (e){
        throw new GraphQLError('refund failed')
      }
    }

    else if (request.ticketType === TicketType.SUBSCRIPTION){
      try {
        const purchase = await prisma.subscriptions.findUnique({
          where: {
            id: request.referenceId,
          },
        })
        const subscription = await stripe.subscriptions.retrieve(purchase.stripeId, {
          expand: ['latest_invoice.payment_intent'],
        })

        await refundSubscription(subscription, stripe)
        await stripe.subscriptions.cancel(purchase.stripeId)
        await prisma.subscriptions.update({
          where: {
            id: purchase.id,
          },
          data: {
            expiresAt: new Date(),
          },
        })
      } catch (e){
        throw new GraphQLError('refund failed')
      }
    } 
  }
  return true
}

export default updateRefundStatus