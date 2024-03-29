import { makeSchema } from 'nexus'

import mutations from '../mutations'
import queries from '../queries'
import types from '../types'

const schema = makeSchema({
  types: [types, queries, mutations],
})

export default schema