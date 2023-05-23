import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, buttonVariants } from '@/components/button'
import { Separator } from '@/components/separator'
import Logo from '@/icons/logo.svg'

import { useTranslation } from 'next-i18next'

interface AuthenticationNavigationProps {
  type: 'Login' | 'Register'
}

const AuthenticationNavigation = ({ type }: AuthenticationNavigationProps) => {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()

  return (
    <header className="w-full border-b p-2 fixed top-0 z-50 bg-white">
      <div className="grid max-w-screen-xl px-5 min-[1300px]:px-0 mx-auto grid-cols-2">
        <div className="flex items-start">
          <Link
            href="/"
            aria-label={t('navigation.home') as string}
            className="text-black hover:text-black/80 transition-colors"
          >
            <div className="w-9 h-9">
              <Logo />
            </div>
          </Link>
        </div>
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
              href={`${type === 'Login' ? '/signup' : '/login'}${router.query.redirect ? `?redirect=${router.query.redirect}` : ''}`}
            >
              {type === 'Register' ? t('navigation.login') : t('navigation.createAnAccount')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AuthenticationNavigation