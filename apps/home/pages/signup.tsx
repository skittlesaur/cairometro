import type { NextPage } from 'next'

import Signup from '@/components/authentication/signup'
import AuthenticationLayout from '@/layouts/authentication'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

const SignupPage: NextPage = () => {
  const { t } = useTranslation('signup')

  return (
    <AuthenticationLayout type="Register">
      <NextSeo
        title={t('seo.title') as string}
        description={t('seo.description') as string}
      />
      <Signup />
    </AuthenticationLayout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'signup'])),
  },
})

export default SignupPage