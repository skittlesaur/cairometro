import { MouseEvent, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import { Separator } from '@/components/separator'
import DateTimePicker from '@/components/ticket-search/calendar/date-time-picker'
import Passengers from '@/components/ticket-search/passengers'
import StationInput from '@/components/ticket-search/station-input'
import Station from '@/types/station'

import * as Menubar from '@radix-ui/react-menubar'
import { useTranslation } from 'next-i18next'
import toast from 'react-hot-toast'

export type TicketSearchRefType = {
  getResult: ()=> unknown
}

interface TicketSearchProps {
  dynamicLocationUpdate?: ({ from, to }: { from?: Station, to?: Station })=> void
  variant?: 'primary' | 'outline'
}

const TicketSearch = ({ dynamicLocationUpdate, variant = 'primary' }: TicketSearchProps) => {
  const { t } = useTranslation('find-ticket')
  const router = useRouter()

  const departureRef = useRef<TicketSearchRefType>(null)
  const destinationRef = useRef<TicketSearchRefType>(null)
  const travelTimeRef = useRef<TicketSearchRefType>(null)
  const passengersRef = useRef<TicketSearchRefType>(null)

  const onSearchClick = useCallback((_: MouseEvent<HTMLButtonElement>) => {
    if (!departureRef.current) return
    const departure = departureRef.current?.getResult() as { id: string, name: string }

    if (!departure || !departure.id || !departure.name) {
      toast.error('Please select a valid departure station')
      return
    }

    if (!destinationRef.current) return
    const destination = destinationRef.current?.getResult() as { id: string, name: string }

    if (!destination || !destination.id || !destination.name) {
      toast.error('Please select a valid destination station')
      return
    }

    if (!travelTimeRef.current) return
    const travelTime = travelTimeRef.current?.getResult() as { date: Date, meridiem: boolean, hours: string, minutes: string }

    if (!travelTime.date
      || !travelTime.hours
      || !travelTime.minutes
    ) {
      toast.error('Please select a valid travel time')
      return
    }

    const date = new Date(
      travelTime.date.getFullYear(),
      travelTime.date.getMonth(),
      travelTime.date.getDate(),
      travelTime.meridiem ? parseInt(travelTime.hours) : parseInt(travelTime.hours) + 12,
      parseInt(travelTime.minutes),
    )

    if (!passengersRef.current) return
    const passengers = passengersRef.current?.getResult() as { adults: number, seniors: number, children: number }

    if (
      passengers.adults === 0 &&
      passengers.seniors === 0 &&
      passengers.children === 0
    ) {
      toast.error('Please select at least one passenger')
      return
    }

    router.push({
      pathname: '/tickets',
      query: {
        departure: departure.id,
        destination: destination.id,
        date: date.toISOString(),
        adults: passengers.adults,
        seniors: passengers.seniors,
        children: passengers.children,
      },
    })
  }, [router])

  return (
    <Menubar.Root className="relative z-[5] -translate-y-1/2 -mb-28 md:-mb-10 gap-4 md:gap-8 flex md:flex-row justify-between flex-col items-center border border-neutral-300 rounded-lg shadow-xl bg-white px-5 py-4 md:px-9 md:py-7 mx-4 md:mx-auto md:w-full max-w-[1300px]">
      <StationInput
        ref={departureRef}
        title={t('from.title')}
        placeholder={t('from.placeholder')}
        onSelected={(station) => {
          if (dynamicLocationUpdate) dynamicLocationUpdate({ from: station })
        }}
      />
      <Separator
        vertical
        className="hidden md:block w-[1px] h-10 bg-neutral-200"
      />
      <StationInput
        ref={destinationRef}
        title={t('to.title')}
        placeholder={t('to.placeholder')}
        onSelected={(station) => {
          if (dynamicLocationUpdate) dynamicLocationUpdate({ to: station })
        }}
      />
      <Separator
        vertical
        className="hidden md:block w-[1px] h-10 bg-neutral-200"
      />
      <div className="flex flex-col items-start w-full">
        <label className="text-base font-medium text-base-black block">
          {t('travelTime.title')}
        </label>
        <DateTimePicker
          ref={travelTimeRef}
        />
      </div>
      <Separator
        vertical
        className="hidden md:block w-[1px] h-10 bg-neutral-200"
      />
      <Passengers ref={passengersRef} />
      <div className="flex flex-col items-start w-full">
        <Button
          size={'lg'}
          variant={variant}
          className="min-w-[14em] w-full"
          onClick={onSearchClick}
        >
          {t('findARide')}
        </Button>
      </div>
    </Menubar.Root>
  )
}

export default TicketSearch