import type { NextPage } from 'next'

import Tickets from '@/components/tickets/find'
import AppLayout from '@/layouts/app'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const TicketsPage: NextPage = () => {
  return (
    <AppLayout
      navigation={{
        variant: 'blur',
        activePath: '/tickets',
      }}
    >
      <Tickets />
    </AppLayout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'find-ticket'])),
  },
})

export default TicketsPage