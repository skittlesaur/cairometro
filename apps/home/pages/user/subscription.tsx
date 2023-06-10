import type { NextPage } from 'next'

import Subscription from '@/components/user/subscription'
import AppLayout from '@/layouts/app'
import AuthenticatedUser from '@/layouts/user'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const UserSubscriptionPage: NextPage = () => {
  // const { t } = useTranslation('home')

  return (
    <AuthenticatedUser>
      <AppLayout
        navigation={{
          variant: 'blur',
          activePath: '/user/subscriptions',
        }}
      >
        {/* <NextSeo*/}
        {/*  title={t('seo.title') as string}*/}
        {/*  description={t('seo.description') as string}*/}
        {/*  titleTemplate="%s"*/}
        {/* />*/}
        <Subscription />
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

export default UserSubscriptionPage