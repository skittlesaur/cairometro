import { useState } from 'react'
import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import Loader from '@/components/loader'
import OrSeparator from '@/components/or-separator'
import Ticket from '@/components/ticket'
import useSchedule from '@/graphql/schedule/schedule'
import useStationById from '@/graphql/stations/station-by-id'

const TAKE_PER_PAGE = 1

const SchedulePage = ({ page, disableLoadMore }: { page: number, disableLoadMore: ()=> void }) => {
  const router = useRouter()

  const {
    departure, destination, date, adults, seniors, children,
  } = router.query

  const { data, isLoading, error } = useSchedule({
    from: departure as string,
    to: destination as string,
    date: date as string,
    passengers: {
      adults: parseInt(adults as string),
      seniors: parseInt(seniors as string),
      children: parseInt(children as string),
    },
    take: TAKE_PER_PAGE,
    page,
  })

  if (error && error[0]?.message === 'There are no more rides for this path today') {
    disableLoadMore()
  }

  return (
    <div className="flex flex-col gap-5">
      {isLoading && !error && (
        <Loader />
      )}
      {data?.schedule?.map((schedule: { departureTime: Date, arrivalTime: Date }) => (
        <Ticket
          key={`${schedule.departureTime}-${schedule.arrivalTime}-search`}
          departure={data.from.name}
          arrival={data.to.name}
          departureTime={new Date(schedule.departureTime)}
          arrivalTime={new Date(schedule.arrivalTime)}
          href={`/tickets/${data.from.id}/${data.to.id}/${new Date(schedule.departureTime).getTime()}`}
          price={data.price}
          stations={data.noOfStationsOnPath}
        />
      ))}
    </div>
  )
}
const FullSchedule = ({ loaded }: { loaded: boolean }) => {
  const [page, setPage] = useState(-1)
  const [hasMore, setHasMore] = useState(true)

  const router = useRouter()

  const { departure, destination } = router.query

  const { data: departureData } = useStationById({
    id: departure as string,
  })

  const { data: destinationData } = useStationById({
    id: destination as string,
  })

  if (!departureData || !departureData) {
    return (
      <></>
    )
  }

  if (page === -1) {
    return (
      <div className="flex items-center justify-center">
        {loaded && (
          <Button
            variant="secondary"
            onClick={() => setPage(0)}
          >
            View full schedule for {departureData?.name} to {destinationData?.name}
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-20">
      <OrSeparator>
        Full Schedule
      </OrSeparator>
      <div className="flex flex-col gap-10">
        {Array.from({ length: page + 1 }).map((_, index) => (
          <SchedulePage
            key={index}
            page={index}
            disableLoadMore={() => setHasMore(false)}
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex items-center justify-center">
          <Button
            variant="secondary"
            onClick={() => setPage(page + 1)}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}

export default FullSchedule