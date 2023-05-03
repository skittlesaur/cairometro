import { FieldResolver } from 'nexus'

import { Context } from '../../context'

const signup: FieldResolver<'Mutation', 'signup'> = async (_, args, ctx: Context): Promise<Partial<User>> => {

  console.log(args)

  return null

}


export default signup