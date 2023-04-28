import { queryType } from 'nexus'

import me from './resolvers/queries/me'
import UserType from './types/user'


const queries = queryType({
  definition(t){
    t.field('me', {
      type: UserType,
      resolve: me,
    })
  },
})

export default queries