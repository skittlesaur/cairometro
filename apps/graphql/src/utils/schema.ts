import { makeSchema } from 'nexus'

import queries from '../queries'
import types from '../types'

const schema = makeSchema({
  types: [types, queries],
})

export default schema