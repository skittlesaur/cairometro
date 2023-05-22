import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

import DefaultSeoSettings from '@/components/default-seo-settings'
import PurchaseModal from '@/components/modal/purchase'
import { AppProvider } from '@/context/app-context'
import fetcher from '@/lib/fetcher'

import { appWithTranslation } from 'next-i18next'
import { SWRConfig } from 'swr'

import '../styles/globals.css'

const Toaster = dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster), {
  ssr: false,
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Toaster position="bottom-center" />
      <DefaultSeoSettings />
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <AppProvider>
          <PurchaseModal />
          <Component {...pageProps} />
        </AppProvider>
      </SWRConfig>
    </>
  )
}

export default appWithTranslation(App)