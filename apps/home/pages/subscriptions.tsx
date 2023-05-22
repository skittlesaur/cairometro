import type { NextPage } from 'next'

import Subscriptions from '@/components/subscriptions'
import AppLayout from '@/layouts/app'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

const SubscriptionsPage: NextPage = () => {
  const { t } = useTranslation('subscriptions')

  return (
    <AppLayout
      navigation={{
        activePath: '/subscriptions',
      }}
    >
      <NextSeo
        title={t('seo.title') as string}
        description={t('seo.description') as string}
      />
      <Subscriptions />
    </AppLayout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common', 'subscriptions',
    ])),
  },
})

export default SubscriptionsPage