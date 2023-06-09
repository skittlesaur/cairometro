import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus'

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
    
    await prisma.refunds.create({
      data: {
        referenceId: ticket.id,
        ticketType,
        userId: user.id,
        price: ticket.price,
        message: 'Ticket refund request',
      },
    })

    return true
  }

  // @todo: handle subscription refunds

  throw new GraphQLError('Invalid ticket type')
}

export default addRefund