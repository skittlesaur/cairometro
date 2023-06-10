import { FieldResolver, arg } from "nexus"
import adminPermission from "../../permissions/admin"

const updateVerificationStatus: FieldResolver< 'Mutation', 'updateVerificationStatus' > = async(_, args, ctx)=>{
    const { prisma } = ctx

    // adminPermission(ctx)
    console.log(args.documentVerified.verificationstatus)
    const x = await prisma.user.update({
        where: {
            id: args.userId
        },
        data: {
            documentVerified: args.documentVerified.verificationstatus
        }
    })
    console.log(x)

    return true
}

export default updateVerificationStatus