import { FieldResolver, arg } from "nexus"
import adminPermission from "../../permissions/admin"

const updateRefundStatus: FieldResolver< 'Mutation', 'updateRefundStatus' > = async(_, args, ctx)=>{
    const { prisma } = ctx

    // adminPermission(ctx)
    console.log(args)
    await prisma.refund.update({
        where: {
            id: args.refundRequestId
        },
        data: {
            status: args.status.refundStatus
        }
    })

    return true
}

export default updateRefundStatus