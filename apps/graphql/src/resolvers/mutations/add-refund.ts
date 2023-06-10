import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

import sendEmail, { EmailTemplate } from '../../lib/send-email'
import authenticatedPermission from '../../permissions/authenticated'

const addRefund: FieldResolver<'Mutation', 'addRefund'> = async (
  _, args, ctx,
) => {
  authenticatedPermission(ctx)
  const { prisma, user } = ctx
  const { ticketType, id } = args
  const type = ticketType.ticketType

  const requestExists = await prisma.refund.findFirst({
    where: {
      referenceId: id,
      userId: user.id,
    },
  })

  if (requestExists) {
    throw new GraphQLError('Refund request already exists')
  }

  if (type === 'TICKET') {
    const ticket = await prisma.userTickets.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        from: true,
        to: true,
      },
    })

    if (!ticket) {
      throw new GraphQLError('Ticket not found')
    }

    // check if ticket is refundable (date of ticket is in the future and 1 hour before departure)
    const ticketDate = new Date(ticket.date)
    const now = new Date()
    const oneHourBeforeDeparture = new Date(ticketDate.getTime() - 60 * 60 * 1000)

    if (oneHourBeforeDeparture < now) {
      throw new GraphQLError('Ticket is not refundable')
    }

    await prisma.refund.create({
      data: {
        referenceId: ticket.id,
        ticketType: type,
        userId: user.id,
        price: ticket.price,
        message: 'Ticket refund request',
      },
    })

    await sendEmail<EmailTemplate.REFUND_REQUEST_TICKET>(
      user.email,
      'Ticket refund request',
      EmailTemplate.REFUND_REQUEST_TICKET,
      {
        name: user.name,
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
      },
    )

    return true
  }

  if (type === 'SUBSCRIPTION') {
    const subscription = await prisma.subscriptions.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!subscription) {
      throw new GraphQLError('Subscription not found')
    }

    await prisma.refund.create({
      data: {
        referenceId: subscription.id,
        ticketType: type,
        price: subscription.price ?? 0,
        message: 'Subscription refund request',
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    // await sendEmail<EmailTemplate.REFUND_REQUEST_SUBSCRIPTION>(
    //   user.email,
    //   'Subscription refund request',
    //   EmailTemplate.REFUND_REQUEST_SUBSCRIPTION,
    //   {
    //     name: user.name,
    //     refundAmount: `${subscription.price.toFixed(2)} EGP`,
    //   },
    // )

    return true
  }

  throw new GraphQLError('Invalid ticket type')
}

export default addRefund