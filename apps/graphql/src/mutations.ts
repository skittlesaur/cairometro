import { mutationType, stringArg } from 'nexus'

import UserType from './types/user'
import example from './resolvers/mutations/example'

const mutations = mutationType({
  definition(t) {
    t.field('example', {
      type: UserType,
      args: { name: stringArg() },
      resolve: example,
    })
  },
})

export default mutations