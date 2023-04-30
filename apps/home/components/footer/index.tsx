import Link from 'next/link'

import AppStoreIcon from '@/icons/app-store.svg'
import CallOutlineIcon from '@/icons/call-outline.svg'
import GooglePlayIcon from '@/icons/google-play.svg'
import Logo from '@/icons/logo.svg'
import MailOutlineIcon from '@/icons/mail-outline.svg'

import { useTranslation } from 'next-i18next'

const contact: {type: 'phone'|'email', value: string}[] = [
  {
    type: 'phone',
    value: '16048',
  },
  {
    type: 'phone',
    value: '(202) 25748353',
  },
  {
    type: 'email',
    value: 'contact.us@cairometro.gov.eg',
  },
]

const Footer = () => {
  const { t } = useTranslation('common')

  const pages = [
    {
      title: t('footer.metro.title'),
      subpages: [
        {
          title: t('footer.metro.stations'),
          href: '/stations',
        },
        {
          title: t('footer.metro.subscriptions'),
          href: '/subscriptions',
        },
        {
          title: t('footer.metro.lines'),
          href: '/lines',
        },
        {
          title: t('footer.metro.tickets'),
          href: '/tickets',
        },
      ],
    },
    {
      title: t('footer.instructions.title'),
      subpages: [
        {
          title: t('footer.instructions.specialNeeds'),
          href: '/special-needs',
        },
        {
          title: t('footer.instructions.rules'),
          href: '/rules',
        },
        {
          title: t('footer.instructions.schedule'),
          href: '/schedule',
        },
      ],
    },
    {
      title: t('footer.development.title'),
      subpages: [
        {
          title: t('footer.development.github'),
          href: 'https://github.com/skittlesaur/egymetro',
        },
      ],
    },
  ]

  return (
    <div className="w-full bg-neutral-900 text-white">
      <div className="max-w-screen-xl mx-auto px-8 min-[1300px]:px-0 py-10 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col items-start gap-5">
          <Link
            href="/"
            className="hover:text-neutral-300 transition-colors self-center lg:self-start"
          >
            <Logo className="w-14 h-14" />
          </Link>
          <div className="flex flex-col items-start gap-1">
            {contact.map((item) => (
              <Link
                key={item.value}
                href={
                  item.type === 'phone'
                    ? `tel:${item.value}`
                    : `mailto:${item.value}`
                }
                className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors text-sm"
              >
                {item.type === 'phone' && (
                  <CallOutlineIcon className="w-4 h-4" />
                )}
                {item.type === 'email' && (
                  <MailOutlineIcon className="w-4 h-4" />
                )}
                <span dir="ltr">{item.value}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {pages.map((page) => (
            <div
              key={page.title}
              className="flex flex-col items-start gap-2"
            >
              <p className="text-xs font-semibold text-neutral-400">{page.title}</p>
              {page.subpages.map((subpage) => (
                <Link
                  key={subpage.title}
                  href={subpage.href}
                  target={subpage.href.startsWith('http') ? '_blank' : '_self'}
                  className="hover:text-neutral-300 transition-colors text-sm"
                >
                  {subpage.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="lg:justify-self-end">
          <div className="flex flex-col gap-4">
            <p className="font-semibold">
              {t('footer.getTheApp')}
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="https://play.google.com/store/apps/details?id=metro.amateurapps.com.cairometro&hl=en&gl=US"
                target="_blank"
              >
                <GooglePlayIcon className="w-40 hover:opacity-80 transition-opacity" />
              </Link>
              <Link
                href="https://apps.apple.com/us/app/cairo-metro/id1559696641"
                target="_blank"
              >
                <AppStoreIcon className="w-40 hover:opacity-80 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer