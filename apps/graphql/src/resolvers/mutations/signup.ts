import { FieldResolver } from 'nexus'

import { Context } from '../../context'

const signup: FieldResolver<'Mutation', 'signup'> = async (_, args, ctx: Context): Promise<Partial<User>> => {


  return null

}


export default signup