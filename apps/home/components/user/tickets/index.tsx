import History from '@/components/user/tickets/history'

import { useTranslation } from 'next-i18next'

const UserTickets = () => {
  const { t } = useTranslation('user-ticket')
  return (
    <div className="min-h-[50vh] flex flex-col gap-5 md:gap-10 my-16 md:my-40">
      <div className="flex items-center justify-between gap-1">
        <h1 className="text-2xl font-bold">
          {t('History')}
        </h1>
        <div>
          {/*  @todo: calendar */}
        </div>
      </div>
      <History />
    </div>
  )
}

export default UserTickets