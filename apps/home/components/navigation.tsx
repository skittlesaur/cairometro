import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, buttonVariants } from '@/components/button'
import { Separator } from '@/components/seperator'
import Logo from '@/icons/logo.svg'

import { cva, VariantProps } from 'class-variance-authority'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'

const navigationVariants = cva(
  'w-full border-b p-2 fixed top-0 z-50',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200',
        transparent: 'bg-transparent',
        blur: 'backdrop-filter backdrop-blur bg-white/80 border-gray-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface NavigationProps extends VariantProps<typeof navigationVariants> {
  activePath?: 'home' | 'stations' | 'subscriptions' | 'instructions'
}

const Navigation = ({ activePath, variant }: NavigationProps) => {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()

  const links = [
    {
      name: t('navigation.home'),
      href: '/',
    },
    {
      name: t('navigation.stations'),
      href: '/stations',
    },
    {
      name: t('navigation.subscriptions'),
      href: '/subscriptions',
    },
    {
      name: t('navigation.instructions'),
      href: '/instructions',
    },
  ]

  return (
    <header className={cn(navigationVariants({ variant }))}>
      <div className="max-w-screen-xl mx-auto grid grid-cols-3">
        <div className="flex items-start">
          <Link
            href="/"
            className="text-black hover:text-black/80 transition-colors"
          >
            <div className="w-9 h-9">
              <Logo />
            </div>
          </Link>
        </div>
        <nav className="flex items-center justify-center gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm transition-colors ${cn({
                'text-black font-medium': link.name.toLowerCase() === activePath,
                'text-neutral-600 hover:text-black': link.name.toLowerCase() !== activePath,
              })}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex justify-end gap-3">
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
          <div className="flex items-center gap-3">
            <Link
              className={buttonVariants({
                variant: 'linkSecondary', size: 'sm', padding: 'none', className: 'text-black', 
              })}
              href="/login"
            >
              {t('navigation.login')}
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ variant: 'primary', size: 'sm' })}
            >
              {t('navigation.createAccount')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation