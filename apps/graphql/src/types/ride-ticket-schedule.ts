import { objectType } from 'nexus'

const RideTicketSchedule = objectType({
  name: 'RideTicketSchedule',
  definition(t) {
    t.field('departureTime', { type: 'DateTime' })
    t.field('arrivalTime', { type: 'DateTime' })
  },
})

export default RideTicketSchedule