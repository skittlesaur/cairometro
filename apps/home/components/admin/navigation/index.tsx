import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import { Separator } from '@/components/separator'
import ArrowForwardIcon from '@/icons/arrow-forward.svg'
import Logo from '@/icons/logo.svg'

import cn from 'classnames'
import { useTranslation } from 'next-i18next'


export interface AdminNavigationProps {
  activePath?: `/admin${`/${string}` | ''}`
}
const AdminNavigation = ({ activePath }: AdminNavigationProps) => {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()

  const nav = [
    {
      name: 'Home',
      href: '/admin',
    },
    {
      name: 'Lines and Stations',
      href: '/admin/lines-and-stations',
    },
    {
      name: 'Refunds',
      href: '/admin/refunds',
    },
    {
      name: 'Seniors Verification',
      href: '/admin/seniors-verification',
    },
    {
      name: 'Team',
      href: '/admin/team',
    },
  ]

  return (
    <header className="w-full border-b p-2 fixed top-0 z-50 before:absolute before:inset-0 before:z-[-1] before:bg-white/80 before:backdrop-blur border-gray-200">
      <div className="flex items-center justify-between max-w-screen-xl px-5 min-[1300px]:px-0 mx-auto">
        <div className="flex items-start">
          <Link
            href="/help"
            aria-label={t('navigation.home') as string}
            className="text-black hover:text-black/80 transition-colors flex items-center gap-3"
          >
            <div className="w-9 h-9">
              <Logo />
            </div>
            <h1>
              Admin Panel
            </h1>
          </Link>
        </div>
        <nav className="flex items-center">
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm transition-colors py-2 px-3 ${cn({
                'text-black font-medium': item.href === activePath,
                'text-neutral-600 hover:text-black': item.href !== activePath,
              })}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="linkSecondary"
            size="sm"
            padding="none"
            onClick={() => {
              const { pathname, asPath, query } = router
              const locale = i18n.language === 'ar' ? 'en' : 'ar'
              router.push({ pathname, query }, asPath, { locale })
            }}
          >
            {i18n.language === 'ar' ? 'English' : 'العربية'}
          </Button>
          <Separator vertical />
          <Link
            href="/"
            className="text-sm font-medium flex items-center gap-1 text-primary hover:text-primary/70 transition-color"
          >
            Back to Cairo Metro
            <ArrowForwardIcon className="w-3 h-3 -rotate-45" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AdminNavigation