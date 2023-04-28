import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

import fetcher from '@/lib/fetcher'

import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { SWRConfig } from 'swr'

import '../styles/globals.css'

const Toaster = dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster), {
  ssr: false,
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo
        title="baraa.app"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
        openGraph={{
          type: 'website',
          url: process.env.NEXT_PUBLIC_SITE_URL,
          images: [
            {
              url: '/og-image.png',
            },
          ],
        }}
      />
      <Toaster position="bottom-center" />
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  )
}

export default appWithTranslation(App)