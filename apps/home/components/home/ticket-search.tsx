import { MouseEvent, useCallback, useRef } from 'react'

import { Button } from '@/components/button'
import Passengers from '@/components/passengers'
import { Separator } from '@/components/separator'

import * as Menubar from '@radix-ui/react-menubar'
import { useTranslation } from 'next-i18next'
import toast from 'react-hot-toast'

import AutoComplete from './auto-complete'

export type TicketSearchRefType = {
  getResult: ()=> unknown
}

const TicketSearch = () => {
  const { t } = useTranslation('home')
  
  const passengersRef = useRef<TicketSearchRefType>(null)

  const onSearchClick = useCallback((_: MouseEvent<HTMLButtonElement>) => {
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
  }, [])

  return (
    <Menubar.Root className="-translate-y-1/2 -mb-28 md:-mb-10 gap-4 md:gap-8 flex md:flex-row justify-between flex-col items-center border border-neutral-300 rounded-lg shadow-xl bg-white px-5 py-4 md:px-9 md:py-7 mx-4 md:mx-auto md:w-full max-w-[1300px]">
      <div className="flex flex-col items-start w-full">
        <label className="text-base font-medium text-base-black block">
          {t('hero.from.title')}
        </label>
        <AutoComplete />
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
        <input
          placeholder={t('hero.travelTime.placeholder') as string}
          className="font-normal text-sm leading-5 text-neutral-500"
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