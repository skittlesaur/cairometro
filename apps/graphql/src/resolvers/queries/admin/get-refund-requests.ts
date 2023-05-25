import { FieldResolver, arg } from "nexus"
import adminPermission from "../../../permissions/admin"

const getRefundRequests: FieldResolver< 'Query', 'getRefundRequests' > = async(_, args, ctx)=>{
    const { prisma } = ctx

    // adminPermission(ctx)
    const refundRequests = await prisma.refund.findMany({
        skip: args.page * 10,
        take: 10
    })

    return refundRequests
}

export default getRefundRequests 