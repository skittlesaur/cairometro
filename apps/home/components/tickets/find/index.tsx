import { useRouter } from 'next/router'

import Loader from '@/components/loader'
import Ticket from '@/components/ticket'
import TicketSearch from '@/components/ticket-search'
import FullSchedule from '@/components/tickets/find/full-schedule'
import Hero from '@/components/tickets/hero'
import useSchedule from '@/graphql/schedule/schedule'
import Station from '@/types/station'

interface TicketsProps {
  departure: Station
  destination: Station
}

const Tickets = ({ departure, destination }: TicketsProps) => {
  const router = useRouter()

  const {
    hours, minutes, meridiem, adults, seniors, children, date,
  } = router.query

  const { data: searchResult } = useSchedule({
    from: departure?.id,
    to: destination?.id,
    date: date as string,
    travelTime: {
      hour: parseInt(hours as string),
      minute: parseInt(minutes as string),
      meridiem: meridiem as 'am' | 'pm',
    },
    passengers: {
      adults: parseInt(adults as string),
      seniors: parseInt(seniors as string),
      children: parseInt(children as string),
    },
    take: 4,
    page: 0,
  })

  return (
    <div className="min-h-screen flex flex-col gap-20 pb-20">
      <div>
        <Hero />
        <TicketSearch />
      </div>
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-semibold">
          Search Result for {departure?.name} to {destination?.name}
        </h1>
        <div className="flex flex-col gap-5">
          {!searchResult && (
            <Loader />
          )}
          {searchResult?.schedule?.map((schedule: { departureTime: Date, arrivalTime: Date }) => (
            <Ticket
              key={`${schedule.departureTime}-${schedule.arrivalTime}-search`}
              departure={searchResult.from.name}
              arrival={searchResult.to.name}
              departureTime={new Date(schedule.departureTime)}
              arrivalTime={new Date(schedule.arrivalTime)}
              href={`/tickets/${searchResult.from.id}/${searchResult.to.id}/${new Date(schedule.departureTime).toISOString()}?adults=${adults}&children=${children}&seniors=${seniors}`}
              price={searchResult.price}
              stations={searchResult.noOfStationsOnPath}
            />
          ))}
        </div>
      </div>
      <FullSchedule 
        loaded={!!searchResult}
        departure={departure}
        destination={destination}
      />
    </div>
  )
}

export default Tickets