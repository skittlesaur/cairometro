import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

/*
  * This is an example of a mutation resolver.
  *
  * To mutate this field, you would run the following mutation:
  *
  * mutation {
  *  example(name: "Baraa")
  * }
 */
const example: FieldResolver<'Mutation', 'example'> =
  async (_, args) => {
    return `Hello ${args.name}`
  }

export default example