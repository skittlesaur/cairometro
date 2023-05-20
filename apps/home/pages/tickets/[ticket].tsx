import TicketDetails from '@/components/tickets/details'
import AppLayout from '@/layouts/app'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const TicketDetailsPage = ()=>{
  return (
    <AppLayout
      navigation={{
        variant: 'blur',
        activePath: '/tickets',
      }}
    >
      <TicketDetails />
    </AppLayout>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'tickets.details', 'find-ticket'])),
  },
})

export default TicketDetailsPage