import { GraphQLError } from 'graphql/error'

import { TicketType } from '@prisma/client'
import { FieldResolver } from 'nexus'
import Stripe from 'stripe'

import { refundSubscription } from '../../lib/refund-subscription'
import adminPermission from '../../permissions/admin'
import sendEmail from '../../lib/send-email'
import { EmailTemplate } from '../../lib/send-email'
import { EmailVariables } from '../../lib/send-email'
import capitalizeFirstLetters from '../../lib/capitalize-first-letters'

const updateRefundStatus: FieldResolver< 'Mutation', 'updateRefundStatus' > = async(_, args, ctx)=>{
  const { prisma } = ctx


  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2022-11-15',
  })
  
  adminPermission(ctx)
  
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
  const request = await prisma.refund.findUnique({
    where: {
      id: args.refundRequestId,
    },
  })
  if (args.status.refundStatus === 'ACCEPTED'){

    if (request.ticketType === TicketType.TICKET){
      const user = await prisma.user.findFirst({
    where: {
      id: refund.userId,
    },
  })

      try {
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

        await stripe.refunds.create({
          payment_intent: ticket.paymentId,
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