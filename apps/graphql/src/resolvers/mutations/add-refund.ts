import { FieldResolver } from 'nexus'

const addRefund: FieldResolver< 'Mutation', 'addRefund' > = async(
  _, args, ctx
)=>{
  const { prisma } = ctx

  await prisma.refund.create({
    data: {
      ticketType: args.ticketType.ticketType,
      userId: args.userId,
      message: args.message,
      price: args.price,
    },
  })

  return true
}

export default addRefund