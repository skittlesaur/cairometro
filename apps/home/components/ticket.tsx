import Link from 'next/link'

import { Button } from '@/components/button'
import WindowSizeWrapper from '@/components/window-size-wrapper'

import { useTranslation } from 'next-i18next'

interface TicketProps {
  departure: string
  departureTime: Date
  arrival: string
  arrivalTime: Date
  href: string
  price: number
  stations: number
}

const Ticket = (props: TicketProps) => {
  const TicketComponent = WindowSizeWrapper({
    DesktopComponent: DesktopTicket,
    MobileComponent: MobileTicket,
  })

  return <TicketComponent {...props} />
}

const MobileTicket = ({
  departure, arrival, departureTime, arrivalTime, href, price, stations,
}: TicketProps) => {
  const { t, i18n } = useTranslation('common')

  return (
    <Link
      href={href}
      className="transition-all duration-150 flex flex-col gap-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-xl w-full py-6 px-10 justify-between group"
    >
      <div className="flex flex-col gap-2">
        <div className="relative w-full flex items-center justify-between">
          <p className="text-lg font-medium">
            {departure}
          </p>
          <p className="text-sm text-center font-normal text-neutral-400">
            {departureTime.toLocaleTimeString(
              i18n.language === 'ar' ? 'ar-EG' : 'en-US',
              {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              },
            )}
          </p>
          <div className="absolute z-[1] top-1/2 -translate-y-1/2 right-full -translate-x-3 rounded-full bg-white border border-gray-300 min-w-[0.6em] max-w-[0.6em] min-h-[0.6em] max-h-[0.6em]" />
        </div>
        <div className="relative">
          <div className="absolute translate-x-[-1.11em] w-0.5 -top-7 -bottom-7 border-l-2 border-dashed border-gray-200" />
        </div>
        <div className="relative w-full flex items-center justify-between">
          <p className="text-lg font-medium">
            {arrival}
          </p>
          <p className="text-sm text-center font-normal text-neutral-400">
            {arrivalTime.toLocaleTimeString(
              i18n.language === 'ar' ? 'ar-EG' : 'en-US',
              {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              },
            )}
          </p>
          <div className="absolute top-1/2 -translate-y-1/2 right-full -translate-x-3 rounded-full bg-gray-300 border border-gray-300 min-w-[0.6em] max-w-[0.6em] min-h-[0.6em] max-h-[0.6em]" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-sm font-normal text-neutral-400">
          {stations} {t('ticket.stations')}
        </p>
        <span className="self-end relative text-xl font-semibold text-primary ltr:text-right rtl:text-left">
          {price === 0 ? (
            <>
              {t('ticket.free')}
              <p className="text-sm font-normal text-neutral-500">
                {t('ticket.withSubscription')}
              </p>
            </>
          ) : (
            <>
              {price.toLocaleString([i18n.language === 'ar' ? 'ar-EG' : 'en-US'], {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              {' '}
              {t('egpShort')}
            </>
          )}
        </span>
      </div>
    </Link>
  )
}

const DesktopTicket = ({
  departure, arrival, departureTime, arrivalTime, href, price, stations,
}: TicketProps) => {
  const { t, i18n } = useTranslation('common')

  return (
    <Link
      href={href}
      className="transition-all duration-150 flex items-center bg-white border border-gray-300 rounded-2xl shadow hover:shadow-xl w-full py-6 px-10 justify-between group"
    >
      <div className="w-full grid grid-cols-3 items-center gap-8">
        <div>
          <p className="text-lg font-medium text-center w-full">
            {departure}
          </p>
          <p className="text-sm text-center font-normal text-neutral-400">
            {departureTime.toLocaleTimeString(
              i18n.language === 'ar' ? 'ar-EG' : 'en-US',
              {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              },
            )}
          </p>
        </div>
        <div className="flex items-center -translate-y-2.5">
          <div className="rounded-full bg-white border border-gray-300 min-w-[0.75em] max-w-[0.75em] min-h-[0.75em] max-h-[0.75em]" />
          <div className="flex flex-col relative w-full">
            <hr className="w-full my-8 border-t-2 border-dashed border-gray-200" />
            <p className="absolute left-1/2 -translate-x-1/2 top-1/2 translate-y-2.5 text-center whitespace-nowrap">
              {stations} {t('ticket.stations')}
            </p>
          </div>
          <div className="rounded-full bg-gray-300 min-w-[0.75em] max-w-[0.75em] min-h-[0.75em] max-h-[0.75em]" />
        </div>
        <div>
          <p className="text-lg font-medium text-center w-full">
            {arrival}
          </p>
          <p className="text-sm text-center font-normal text-neutral-400">
            {arrivalTime.toLocaleTimeString(
              i18n.language === 'ar' ? 'ar-EG' : 'en-US',
              {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              },
            )}
          </p>
        </div>
      </div>
      <div className=" w-[1px] h-16 border-dashed border-gray-300 border-r" />
      <div className="flex items-center gap-12 justify-end">
        <span className="relative text-2xl font-semibold text-primary w-[150px] ltr:text-right rtl:text-left">
          {price === 0 ? (
            <>
              {t('ticket.free')}
              <p className="text-sm font-normal text-neutral-600">
                {t('ticket.withSubscription')}
              </p>
            </>
          ) : (
            <>
              {price.toLocaleString([i18n.language === 'ar' ? 'ar-EG' : 'en-US'], {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              {' '}
              {t('egpShort')}
            </>
          )}
        </span>
        <Button
          variant={'ticket'}
          size={'xl'}
        >
          {t('ticket.viewDetails')}
        </Button>
      </div>
    </Link>
  )
}

export default Ticket