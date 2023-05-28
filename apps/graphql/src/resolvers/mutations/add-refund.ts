import { FieldResolver, arg } from "nexus"

const addRefund: FieldResolver< 'Mutation', 'addRefund' > = async(_, args, ctx)=>{
    const { prisma } = ctx

    await prisma.refund.create({
        data: {
            status: args.status.refundStatus,
            ticketType: args.ticketType.ticketType,
            userId: args.userId,
            message: args.message,
            price: args.price
        }
    })

    return true
}

export default addRefund