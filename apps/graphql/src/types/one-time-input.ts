import { inputObjectType, nonNull, stringArg } from 'nexus'

import passengersInputType from './passengers-input'


const oneTimeInput = inputObjectType({
  name: 'oneTimeInput',
  definition(t) {
    t.field('from', { type: nonNull(stringArg()) })
    t.field('to', { type: nonNull(stringArg()) })
    t.field('passengers', { type: passengersInputType })
    
  },
})
export default oneTimeInput
