import type { NextPage } from 'next'

import Login from '@/components/authentication/login'
import AuthenticationLayout from '@/layouts/authentication'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

const LoginPage: NextPage = () => {
  const { t } = useTranslation('login')

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

// <div className="flex flex-col gap-14">
// <div className="flex flex-col gap-7">
//   <h1 className="text-3xl font-bold">Login</h1>
//   <div className="flex flex-col gap-1">
//     <h1 className="text-sm font-medium text-neutral-500">
//       Email Address
//     </h1>
//     <input className="bg-white border border-neutral-300 focus-visible:ring-offset-0 py-3 pl-5 rounded"></input>
//   </div>
//   <button className="bg-primary text-white py-3 px-64 rounded">
//     Login
//   </button>
// </div>
// <div>
//   <h1 className="text-sm text-neutral-500">OR</h1>
// </div>
// <button className="flex flex-row bg-white border border-neutral-300 text-neutral-600 py-3 px-64 rounded">
//   <GoogleLogo className="text-neutral-600" />
//   Continue with Google
// </button>
// </div>
