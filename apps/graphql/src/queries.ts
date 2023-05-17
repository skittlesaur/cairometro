import { intArg, queryType } from 'nexus'

import me from './resolvers/queries/me'
import stations from './resolvers/queries/stations'
import StationType from './types/station'
import UserType from './types/user'


const queries = queryType({
  definition(t){
    t.list.field('stations', {
      type: StationType,
      args: {
        page: intArg({ default: 1 }),
        take: intArg({ default: 10 }),
      },
      resolve: stations,
    })
    
    t.field('me', {
      type: UserType,
      resolve: me,
    })
  },
})

export default queries