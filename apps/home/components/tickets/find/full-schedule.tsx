import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import Loader from '@/components/loader'
import OrSeparator from '@/components/or-separator'
import Ticket from '@/components/ticket'
import useSchedule from '@/graphql/schedule/schedule'
import Station from '@/types/station'

const TAKE_PER_PAGE = 5

interface SchedulePageProps {
  page: number
  disableLoadMore: ()=> void
}

const SchedulePage = React.memo(({ page, disableLoadMore }: SchedulePageProps) => {
  const router = useRouter()

  const {
    departure, destination, adults, seniors, children, 
  } = router.query

  const { data, isLoading, error } = useSchedule(
    {
      from: departure as string,
      to: destination as string,
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
      {isLoading && !error && <Loader />}
      {data?.schedule?.map((schedule: { departureTime: Date, arrivalTime: Date }) => (
        <Ticket
          key={`${schedule.departureTime}-${schedule.arrivalTime}-search`}
          departure={data.from.name}
          arrival={data.to.name}
          departureTime={new Date(schedule.departureTime)}
          arrivalTime={new Date(schedule.arrivalTime)}
          href={`/tickets/${data.from.id}/${data.to.id}/${new Date(schedule.departureTime).getTime()}?adults=${adults}&children=${children}&seniors=${seniors}`}
          price={data.price}
          stations={data.noOfStationsOnPath}
        />
      ))}
    </div>
  )
})

SchedulePage.displayName = 'SchedulePage'

interface FullScheduleProps {
  loaded: boolean
  departure: Station
  destination: Station
}

const FullSchedule = ({ loaded, departure, destination }: FullScheduleProps) => {
  const [pagination, setPagination] = useState({ page: -1, hasMore: true })

  if (pagination.page === -1) {
    return (
      <div className="flex items-center justify-center">
        {loaded && (
          <Button
            variant="secondary"
            onClick={() => setPagination({ page: 0, hasMore: true })}
          >
            View full schedule for {departure?.name} to {destination?.name}
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-20">
      <OrSeparator>Full Schedule</OrSeparator>
      <div className="flex flex-col gap-5">
        {Array.from({ length: pagination.page + 1 }).map((_, index) => (
          <SchedulePage
            key={`schedule-page-${index}`}
            page={index}
            disableLoadMore={() => setPagination({ ...pagination, hasMore: false })}
          />
        ))}
      </div>
      {pagination.hasMore && (
        <div className="flex items-center justify-center">
          <Button
            variant="secondary"
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}

export default FullSchedule