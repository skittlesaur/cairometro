import { inputObjectType } from 'nexus'

import passengersInputType from './passengers-input'


const oneTimeInput = inputObjectType({
  name: 'oneTimeInput',
  definition(t) {
    t.field('from', { type: 'String' })
    t.field('to', { type: 'String' })
    t.field('passengers', { type: passengersInputType })
    t.field('departureTime', { type: 'String' })

  },
})
export default oneTimeInput
