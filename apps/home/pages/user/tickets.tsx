import type { NextPage } from 'next'

import UserTickets from '@/components/user/tickets'
import AppLayout from '@/layouts/app'
import AuthenticatedUser from '@/layouts/user'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

const UserTicketsPage: NextPage = () => {
  const { t } = useTranslation('user-ticket')

  return (
    <AuthenticatedUser>
      <AppLayout
        navigation={{
          variant: 'blur',
          activePath: '/user/tickets',
        }}
      >
        <NextSeo
          title={t('seo.title') as string}
          description={t('seo.description') as string}
        />
        <UserTickets />
      </AppLayout>
    </AuthenticatedUser>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common', 'user-ticket',
    ])),
  },
})

export default UserTicketsPage