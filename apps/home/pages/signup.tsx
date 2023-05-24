import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Signup from '@/components/authentication/signup'
import useUser from '@/graphql/user/me'
import AuthenticationLayout from '@/layouts/authentication'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

const SignupPage: NextPage = () => {
  const { t } = useTranslation('signup')
  const { data, isLoading, error } = useUser()
  const router = useRouter()

  if (data && !isLoading && !error) {
    if (router.query.redirect)
      router.push(router.query.redirect as string)
    else
      router.push('/')
  }

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