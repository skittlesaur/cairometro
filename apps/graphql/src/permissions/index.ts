import { and, or, shield } from 'graphql-shield'

import isAuthenticated from './is-authenticated'

const permissions = shield({
  Query: {
    me: isAuthenticated,
  },
})

export default permissions