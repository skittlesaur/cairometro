import { mutationType, stringArg } from 'nexus'

import example from './resolvers/mutations/example'

const mutations = mutationType({
  definition(t) {
    t.field('example', {
      type: 'String',
      args: {
        name: stringArg(),
      },
      resolve: example,
    })
  },
})

export default mutations