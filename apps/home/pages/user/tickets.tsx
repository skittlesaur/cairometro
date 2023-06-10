import type { NextPage } from 'next'

import UserTickets from '@/components/user/tickets'
import AppLayout from '@/layouts/app'
import AuthenticatedUser from '@/layouts/user'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const UserTicketsPage: NextPage = () => {
  // const { t } = useTranslation('home')

  return (
    <AuthenticatedUser>
      <AppLayout
        navigation={{
          variant: 'blur',
          activePath: '/user/tickets',
        }}
      >
        {/* <NextSeo*/}
        {/*  title={t('seo.title') as string}*/}
        {/*  description={t('seo.description') as string}*/}
        {/*  titleTemplate="%s"*/}
        {/* />*/}
        <UserTickets />
      </AppLayout>
    </AuthenticatedUser>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
    ])),
  },
})

export default UserTicketsPage