import type { NextPage } from 'next'

import Subscription from '@/components/user/subscription'
import AppLayout from '@/layouts/app'
import AuthenticatedUser from '@/layouts/user'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

const UserSubscriptionPage: NextPage = () => {
  const { t } = useTranslation('user-subscriptions')

  return (
    <AuthenticatedUser>
      <AppLayout
        navigation={{
          variant: 'blur',
          activePath: '/user/subscriptions',
        }}
      >
        <NextSeo
          title={t('seo.title') as string}
          description={t('seo.description') as string}
        />
        <Subscription />
      </AppLayout>
    </AuthenticatedUser>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common', 'user-subscriptions', 'user-ticket',
    ])),
  },
})

export default UserSubscriptionPage