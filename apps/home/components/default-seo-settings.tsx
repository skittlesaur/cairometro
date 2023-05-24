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
      additionalMetaTags={[
        {
          name: 'robots',
          content: 'index, follow',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no',
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