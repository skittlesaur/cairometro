import { GraphQLError, graphql } from "graphql"

import { FieldResolver, arg } from "nexus"
import adminPermission from "../../permissions/admin"

const addStation: FieldResolver< 'Mutation', 'addStarion'> = async(_, args, ctx) =>{
    const { prisma } = ctx
    
    adminPermission(ctx)
        const createdStation = await prisma.station.create({
            data: {
                name: args.name,
                name_ar: args.name_ar,
                location: args.location,
                lineIds: args.lineIds
            }
        })
        
    return createdStation
        
}
export default addStation