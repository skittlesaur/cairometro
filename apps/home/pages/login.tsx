import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Login from '@/components/authentication/login'
import useUser from '@/graphql/user/me'
import AuthenticationLayout from '@/layouts/authentication'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import toast from 'react-hot-toast'

const LoginPage: NextPage = () => {
  const { t } = useTranslation('login')
  const { data, isLoading, error } = useUser()
  const router = useRouter()
  
  if (data && !isLoading && !error) {
    if (router.query.redirect) 
      router.push(router.query.redirect as string)
    else
      router.push('/')
  }
  
  useEffect(() => {
    if (router.query.error === 'invalid-link') {
      toast.error(t('errors.invalidLink'))
    }
  }, [router.query.error, t])

  return (
    <AuthenticationLayout type="Login">
      <NextSeo
        title={t('seo.title') as string}
        description={t('seo.description') as string}
      />
      <Login />
    </AuthenticationLayout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'login'])),
  },
})

export default LoginPage
