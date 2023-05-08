import HeartOutline from '@/icons/heart-outline-gradient.svg'
import TicketOutline from '@/icons/ticket-outline-gradient.svg'
import TimerOutline from '@/icons/timer-outline-gradient.svg'

import { useTranslation } from 'next-i18next'

const Companion = () => {
  const { t } = useTranslation('home')

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl relative ltr:text-left rtl:text-right md:!text-center font-semibold">
          {t('companion.title')}
        </h1>
        <p className="text-xl text-neutral-400 ltr:text-left rtl:text-right md:!text-center">
          {t('companion.subtitle')}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="px-9 py-7 bg-neutral-50 border border-neutral-200 rounded-lg flex flex-col items-center justify-start gap-2">
          <HeartOutline className="w-12 h-12" />
          <div className="flex flex-col gap-1 items-center">
            <p className="text-lg font-semibold">
              {t('companion.liveSupport.title')}
            </p>
            <p className="text-sm text-center">
              {t('companion.liveSupport.description')}
            </p>
          </div>
        </div>
        <div className="px-9 py-7 bg-neutral-50 border border-neutral-200 rounded-lg flex flex-col items-center justify-start gap-2">
          <TicketOutline className="w-12 h-12" />
          <div className="flex flex-col gap-1 items-center">
            <p className="text-lg font-semibold">
              {t('companion.easyTracking.title')}
            </p>
            <p className="text-sm text-center">
              {t('companion.easyTracking.description')}
            </p>
          </div>
        </div>
        <div className="px-9 py-7 bg-neutral-50 border border-neutral-200 rounded-lg flex flex-col items-center justify-start gap-2">
          <TimerOutline className="w-12 h-12" />
          <div className="flex flex-col gap-1 items-center">
            <p className="text-lg font-semibold">
              {t('companion.realtimeSchedule.title')}
            </p>
            <p className="text-sm text-center">
              {t('companion.realtimeSchedule.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Companion
