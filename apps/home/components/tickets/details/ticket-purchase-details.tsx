import { MouseEvent, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, buttonVariants } from '@/components/button'
import { Separator } from '@/components/separator'
import { useAppContext } from '@/context/app-context'
import useGetPrice from '@/graphql/get-price'
import createPaymentMutation from '@/graphql/payment/create-payment'
import useRideRoute from '@/graphql/stations/ride-route'
import useUser from '@/graphql/user/me'
import LocationIcon from '@/icons/location.svg'
import QrCodeIcon from '@/icons/qr-code.svg'
import ForwardIcon from '@/icons/return-up-forward.svg'
import TicketIcon from '@/icons/ticket.svg'
import TrainIcon from '@/icons/train.svg'
import Line from '@/types/line'
import Station from '@/types/station'

import cn from 'classnames'
import { useTranslation } from 'next-i18next'

const TicketPurchaseDetails = () => {
  const { purchaseModal } = useAppContext()
  const { t, i18n } = useTranslation('tickets-details')
  const router = useRouter()
  const {
    from, to, departure, adults: adultsString, seniors: seniorsString, children: childrenString,
  } = router.query
  const adults = parseInt(adultsString as string)
  const seniors = parseInt(seniorsString as string)
  const children = parseInt(childrenString as string)

  const { data: ride } = useRideRoute({
    from: from as string,
    to: to as string,
    date: departure as string,
  })

  const { data: user } = useUser()

  const { data: price } = useGetPrice({
    from: from as string,
    to: to as string,
    passengers: {
      adults,
      seniors,
      children,
    },
  })

  const onPurchaseClick = useCallback((_: MouseEvent<HTMLButtonElement>) => {
    if (!ride || price === undefined) return

    if (!user) {
      const pathname = router.pathname
      const query = router.query
      router.push({
        pathname: '/login',
        query: {
          ...query,
          redirect: pathname,
        },
      })
      return
    }

    const metaData = {
      from: ride?.[0].station.id,
      to: ride?.[ride?.length - 1].station.id,
      passengers: {
        adults,
        seniors,
        children,
      },
      departureTime: ride?.[0].time,
    }

    if (price === 0){
      createPaymentMutation({ metaData })
      // router.push('/user/tickets')
      return
    }

    const from = ride?.[0].station
    const to = ride?.[ride?.length - 1].station

    purchaseModal.open({
      title: `${t('purchaseTicket')} (${i18n.language === 'ar' ? from.name_ar : from.name} - ${i18n.language === 'ar' ? to.name_ar : to.name})`,
      price,
      metaData,
      mutation: createPaymentMutation,
    })
  }, [adults,
    children,
    i18n.language,
    price,
    purchaseModal,
    ride,
    router,
    seniors,
    t,
    user])

  const getAdultsText = () =>
    `${adults} ${adults > 1 ? t('adults') : t('adult')}`

  const getSeniorsText = () =>
    `${seniors} ${seniors > 1 ? t('seniors') : t('senior')}`

  const getChildrenText = () =>
    `${children} ${children > 1 ? t('children') : t('child')}`

  const getPassengersText = () => {
    if (adults <= 0 && seniors <= 0 && children <= 0) {
      return t('noPassengersSelected')
    }

    const passengers = []

    if (adults > 0)
      passengers.push(getAdultsText())

    if (seniors > 0)
      passengers.push(getSeniorsText())

    if (children > 0)
      passengers.push(getChildrenText())

    return passengers.join(', ')
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full">
        <h1 className="font-semibold text-3xl leading-9">
          {t('reviewTicketOptions')}
        </h1>
        <div className="flex justify-end gap-x-2.5 items-center">
          <div className="text-right">
            {price === 0 ? (
              <p className="font-semibold text-xl leading-7">
                {t('freeWithSubscription')}
              </p>
            ) : (
              <>
                {price && (
                  <p className="font-semibold text-xl leading-7">
                    {price.toFixed(2)} {t('egp')}
                  </p>
                )}
              </>
            )}
            <p className="leading-6 text-base font-normal text-neutral-600">
              {getPassengersText()}, {t('standard')}
            </p>
          </div>
          <Button
            size={'lg'}
            variant={'primary'}
            className="py-2.5 px-9"
            disabled={
              price === undefined ||
              adults < 0 ||
              seniors < 0 ||
              children < 0 ||
              (adults === 0 && seniors === 0 && children === 0)
            }
            onClick={onPurchaseClick}
          >
            {t('purchase')}
          </Button>
        </div>
      </div>
      <div className="border rounded-2xl grid md:grid-cols-2 my-10 overflow-hidden">
        <div className="md:ltr:border-r md:rtl:border-l px-10 py-3">
          <p className="text-sm font-medium">
            {t('tripRoute.title')}
          </p>
        </div>
        <div className="px-10 py-3 row-start-3 border-t md:border-0 md:row-start-auto">
          <p className="text-sm font-medium">
            {t('flexibilityAndConditions')}
          </p>
        </div>
        <div className="py-4 px-10 border-t md:ltr:border-r md:rtl:border-l">
          {ride?.map((route: { station: Station, time: string }, index: number) => {
            const timeFormat = new Date(parseInt(route.time)).toLocaleTimeString(i18n.language, {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })

            const time = timeFormat.split(' ')[0]
            const period = timeFormat.split(' ')[1]

            let isTransfer = false
            
            if (index > 0 && index < ride.length - 1) {
              const previousStation = ride?.[index - 1]
              const nextStation = ride?.[index + 1]

              if (previousStation && nextStation) {
                const previousLines = previousStation.station.lines
                const nextLines = nextStation.station.lines

                const nextHasSameLineAsPrevious = nextLines.some((nextLine: Line) =>
                  previousLines.some((previousLine: Line) => previousLine.id === nextLine.id))

                if (!nextHasSameLineAsPrevious) {
                  isTransfer = true
                }
              }
            }

            return (
              <>
                <div className="flex gap-x-4 items-center">
                  <div className="flex items-center justify-end gap-x-1 w-16 max-w-16">
                    <p className="text-sm leading-5 font-medium">
                      {time}
                    </p>
                    <p className="text-xs font-medium leading-4">
                      {period}
                    </p>
                  </div>
                  {index === ride.length - 1 ? (
                    <LocationIcon className="w-5 h-5 fill-neutral-400 ltr:-translate-x-0.5 rtl:translate-x-0.5" />
                  ) : (
                    <div className="border-4 rounded-full w-4 h-4 border-neutral-400" />
                  )}
                  <p className="text-sm leading-5 font-medium">
                    {i18n.language === 'ar' ? route.station.name_ar : route.station.name}
                  </p>
                </div>
                {index !== ride.length - 1 && (
                  <div className={`flex gap-x-4 ltr:ml-16 rtl:mr-16 ${isTransfer ? 'h-20' : 'h-10'}`}>
                    <div aria-hidden="true" />
                    <Separator
                      vertical
                      className={'ltr:ml-[0.45em] rtl:mr-[0.45em] w-[2px] bg-neutral-200'}
                    />
                    {isTransfer ? (
                      <div className="flex gap-1 bg-red-100 rounded items-center p-2 ml-2 mt-2 mb-10">
                        <ForwardIcon className="w-4 text-red-500" />
                        <p className="text-sm text-neutral-700 leading-4">
                          {t('tripRoute.transfer')}
                        </p>
                      </div>
                    ) : (
                      <div aria-hidden="true" />
                    )}
                  </div>
                )}
              </>
            )
          })}
        </div>
        <div className="py-4 px-10 border-t flex flex-col gap-2">
          <p className="text-xs leading-4 font-medium text-neutral-500 my-2 uppercase">
            {t('boardingRequirements.title')}
          </p>
          <div className="flex items-center gap-x-2">
            <QrCodeIcon className="w-3.5 fill-neutral-500" />
            <p className="text-sm leading-5 text-neutral-900">
              {t('boardingRequirements.qrCode')}
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <TicketIcon className="w-3.5 fill-neutral-500" />
            <p className="text-sm leading-5 text-neutral-900">
              {t('boardingRequirements.ticket')}
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <TrainIcon className="w-3.5 fill-neutral-500" />
            <p className="text-sm leading-5 text-neutral-900">
              {t('boardingRequirements.learnMore.text').split('{0}').map((text, index) => (
                index === 1 ? (
                  <Link
                    key={index}
                    href="/"
                    className={cn('text-primary h-auto', buttonVariants({
                      variant: 'link',
                      size: 'sm',
                      padding: 'none',
                    }))}
                  >
                    {t('boardingRequirements.learnMore.link')}
                  </Link>
                ) : (
                  <span key={index}>
                    {text}
                  </span>
                )
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketPurchaseDetails