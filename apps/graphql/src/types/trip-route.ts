import { objectType } from 'nexus'

import StationType from './station'

const TripRouteType = objectType({
  name: 'TripRoute',
  definition(t) {
    t.field('station', { type: StationType })
    t.field('time', { type: 'String' })
  },
})


export default TripRouteType