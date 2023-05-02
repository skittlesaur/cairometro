import { makeSchema } from 'nexus'

import queries from '../queries'
import types from '../types'
import mutations from '../mutations'

const schema = makeSchema({
  types: [types, queries, mutations],
})

export default schema