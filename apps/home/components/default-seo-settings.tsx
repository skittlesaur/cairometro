import { useTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'

const DefaultSeoSettings = () => {
  const { t } = useTranslation('common')

  return (
    <DefaultSeo
      titleTemplate={`%s - ${t('title')}`}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/icon-192x192.png',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
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
  )
}

export default DefaultSeoSettings