import type { NextPage } from 'next'

import AppLayout from '@/layouts/app'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomePage: NextPage = () => {
  return (
    <AppLayout
      navigation={{
        variant: 'blur',
        activePath: 'home',
      }}
    >
      <div className="w-screen h-[200vh] flex flex-col gap-6 items-center justify-center overflow-hidden relative">
        <h1 className="flex items-center gap-4 text-6xl font-bold tracking-tight">
          <span>
            🪐
          </span>
          <span>
            baraa.app
          </span>
        </h1>
        <p className="max-w-[40em] text-center mx-4 text-neutral-500">
          TurboRepo template 2.0. Includes preconfigured Next 13, SWR (Axios), Tailwind, svgr for the frontend.
          Backend wise, uses Express, Prisma, and TypeScript
        </p>
      </div>
    </AppLayout>
  )
}

export const getStaticProps = async ({ locale }: {locale: string}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default HomePage