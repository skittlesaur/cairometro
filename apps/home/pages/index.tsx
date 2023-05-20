import type { NextPage } from 'next'

import Home from '@/components/home'
import AppLayout from '@/layouts/app'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

const HomePage: NextPage = () => {
  const { t } = useTranslation('home')

  return (
    <AppLayout
      navigation={{
        variant: 'blur',
        activePath: '/',
      }}
    >
      <NextSeo
        title={t('seo.title') as string}
        description={t('seo.description') as string}
        titleTemplate="%s"
      />
      <Home />
    </AppLayout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home', 'find-ticket'])),
  },
})

export default HomePage