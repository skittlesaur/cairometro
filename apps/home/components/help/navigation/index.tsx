import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import { Separator } from '@/components/separator'
import ArrowForwardIcon from '@/icons/arrow-forward.svg'
import Logo from '@/icons/logo.svg'

import { useTranslation } from 'next-i18next'


const HelpNavigation = () => {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()

  return (
    <header className="w-full border-b p-2 fixed top-0 z-50 before:absolute before:inset-0 before:z-[-1] before:bg-white/80 before:backdrop-blur border-gray-200">
      <div className="grid max-w-screen-xl px-5 min-[1300px]:px-0 mx-auto grid-cols-2">
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
              Help Center
            </h1>
          </Link>
        </div>
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

export default HelpNavigation