import { objectType } from 'nexus'

import RideTicketSchedule from './ride-ticket-schedule'
import StationType from './station'


const RideTicketDataType = objectType({
  name: 'RideTicketData',
  definition(t) {
    t.field('from', { type: StationType })
    t.field('to', { type: StationType })
    t.field('noOfStationsOnPath', { type: 'Int' })
    t.field('price', { type: 'Int' })
    t.list.field('schedule', { type: RideTicketSchedule })
  },
})

export default RideTicketDataType