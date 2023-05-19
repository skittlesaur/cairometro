import { MouseEvent, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import { Separator } from '@/components/separator'
import DateTimePicker from '@/components/ticket-search/calendar/date-time-picker'
import Passengers from '@/components/ticket-search/passengers'

import * as Menubar from '@radix-ui/react-menubar'
import { useTranslation } from 'next-i18next'
import toast from 'react-hot-toast'

export type TicketSearchRefType = {
  getResult: ()=> unknown
}

const TicketSearch = () => {
  const { t } = useTranslation('home')
  const router = useRouter()
  
  const passengersRef = useRef<TicketSearchRefType>(null)
  const travelTimeRef = useRef<TicketSearchRefType>(null)

  const onSearchClick = useCallback((_: MouseEvent<HTMLButtonElement>) => {
    if (!travelTimeRef.current) return
    const travelTime = travelTimeRef.current?.getResult() as {date: Date, meridiem: boolean, hours: string, minutes: string} 
    
    if (!travelTime.date
      || !travelTime.hours
      || !travelTime.minutes
    ){
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
    const passengers = passengersRef.current?.getResult() as {adults: number, seniors: number, children: number}
    
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
        date: date.toISOString(),
        adults: passengers.adults,
        seniors: passengers.seniors,
        children: passengers.children,
      },
    })
  }, [router])

  return (
    <Menubar.Root className="-translate-y-1/2 -mb-28 md:-mb-10 gap-4 md:gap-8 flex md:flex-row justify-between flex-col items-center border border-neutral-300 rounded-lg shadow-xl bg-white px-5 py-4 md:px-9 md:py-7 mx-4 md:mx-auto md:w-full max-w-[1300px]">
      <div className="flex flex-col items-start w-full">
        <label className="text-base font-medium text-base-black block">
          {t('hero.from.title')}
        </label>
        <input
          placeholder={t('hero.from.placeholder') as string}
          className="font-normal text-sm leading-5 text-neutral-500"
        />
      </div>
      <Separator
        vertical
        className="hidden md:block w-[1px] h-10 bg-neutral-200"
      />
      <div className="flex flex-col items-start w-full">
        <label className="text-base font-medium text-base-black block">
          {t('hero.to.title')}
        </label>
        <input
          placeholder={t('hero.to.placeholder') as string}
          className="font-normal text-sm leading-5 text-neutral-500"
        />
      </div>
      <Separator
        vertical
        className="hidden md:block w-[1px] h-10 bg-neutral-200"
      />
      <div className="flex flex-col items-start w-full">
        <label className="text-base font-medium text-base-black block">
          {t('hero.travelTime.title')}
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
          variant={'primary'}
          className="min-w-[14em] w-full"

          onClick={onSearchClick}
        >
          {t('hero.findARide')}
        </Button>
      </div>
    </Menubar.Root>
  )
}

export default TicketSearch