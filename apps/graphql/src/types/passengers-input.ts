import { inputObjectType } from 'nexus'

const passengersInputType = inputObjectType({
  name: 'passengersInputType',
  definition(t) {
    t.field('adults', { type: 'Int' })
    t.field('children', { type: 'Int' })
    t.field('seniors', { type: 'Int' })
  },
})

export default passengersInputType