import type { NextPage } from 'next'

import Home from '@/components/home'
import AppLayout from '@/layouts/app'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomePage: NextPage = () => {
  return (
    <AppLayout
      navigation={{
        variant: 'blur',
        activePath: '/',
      }}
    >
      <Home />
    </AppLayout>
  )
}

export const getStaticProps = async ({ locale }: {locale: string}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default HomePage