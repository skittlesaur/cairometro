import { shield } from 'graphql-shield'

import isAuthenticated from './is-authenticated'
import isSecretPath from './is-secret-path'

const permissions = shield({
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    secretDummyStationsData: isSecretPath,
  },
})

export default permissions