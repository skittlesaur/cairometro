import { DefaultSeo } from 'next-seo'

const DefaultSeoSettings = () => {
  return (
    <DefaultSeo
      title="Egypt Metro"
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