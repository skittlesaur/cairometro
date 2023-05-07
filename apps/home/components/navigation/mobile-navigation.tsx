import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { buttonVariants } from '@/components/button'
import HamburgerMenu from '@/components/navigation/hamburger-menu'
import { NavigationProps } from '@/components/navigation/index'
import { Separator } from '@/components/separator'
import ChevronDownIcon from '@/icons/chevron-down.svg'
import DocumentTextIcon from '@/icons/document-text.svg'
import EarthIcon from '@/icons/earth.svg'
import HomeIcon from '@/icons/home.svg'
import Logo from '@/icons/logo.svg'
import TicketIcon from '@/icons/ticket.svg'
import TrainIcon from '@/icons/train.svg'
import useWindowSize from '@/lib/use-window-size'

import cn from 'classnames'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

const MobileNavigation = ({ activePath }: NavigationProps) => {
  const [hambugerMenuOpen, setHamburgerMenuOpen] = useState<boolean>(false)
  const { height } = useWindowSize()

  const { t, i18n } = useTranslation('common')
  const router = useRouter()


  const links = [
    {
      name: t('navigation.home'),
      href: '/',
      Icon: HomeIcon,
    },
    {
      name: t('navigation.stations'),
      href: '/stations',
      Icon: TrainIcon,
    },
    {
      name: t('navigation.subscriptions'),
      href: '/subscriptions',
      Icon: TicketIcon,
    },
  ]

  const hamburgerVariants = {
    open: {
      clipPath: `circle(${height + 500}px at ${i18n.language === 'ar' ? '7vw' : '90vw'} 25px)`,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        restDelta: 10,
      },
    },
    closed: {
      clipPath: `circle(0px at ${i18n.language === 'ar' ? '7vw' : '90vw'} 25px)`,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }

  return (
    <div className="block lg:hidden w-full px-4 grid items-center grid-cols-2">
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
      <div className="flex items-center justify-end">
        <motion.nav
          initial={false}
          animate={hambugerMenuOpen ? 'open' : 'closed'}
          className="flex items-center justify-end"
        >
          <button
            className={`relative z-[1] ${cn({
              'text-black hover:text-black/80 transition-colors delay-[650ms]': !hambugerMenuOpen,
              'text-white hover:text-white/80 transition-colors': hambugerMenuOpen,
            })}`}
            onClick={() => setHamburgerMenuOpen(prev => !prev)}
          >
            <HamburgerMenu />
          </button>
          <motion.div
            variants={hamburgerVariants}
            className="fixed flex flex-col gap-4 pt-14 px-6 inset-0 bg-neutral-900 text-white z-[z]"
          >
            <Separator
              horizontal
              color="bg-neutral-800"
            />
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/login"
                className={buttonVariants({
                  variant: 'ghost', size: 'sm', padding: 'sm', className: 'hover:bg-gray-400/10 hover:border-gray-700/20',
                })}
              >
                {t('navigation.login')}
              </Link>
              <Link
                href="/signup"
                className={buttonVariants({
                  variant: 'secondary', size: 'sm', padding: 'sm', className: 'text-black',
                })}
              >
                {t('navigation.createAccount')}
              </Link>
              <button
                className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2 col-span-2 flex-row-reverse"
                onClick={() => {
                  const { pathname, asPath, query } = router
                  const locale = i18n.language === 'ar' ? 'en' : 'ar'
                  router.push({ pathname, query }, asPath, { locale })
                }}
              >
                <EarthIcon className="w-5 h-5 fill-current" />
                {i18n.language === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
            <Separator
              horizontal
              color="bg-neutral-800"
            />
            <div className="flex flex-col gap-1">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`flex items-center gap-2 text-lg py-2 px-4 rounded transition-colors ${cn({
                    'text-white font-medium bg-gray-400/10 border border-gray-700/20': activePath === link.href,
                    'text-neutral-400 hover:bg-gray-500/10 border border-transparent hover:border-gray-600/20': activePath !== link.href,
                  })}`}
                >
                  <link.Icon className="w-5 h-5 fill-current" />
                  {link.name}
                </Link>
              ))}
              <button
                className={`flex items-center justify-between text-lg py-2 px-4 rounded transition-colors ${cn({
                  'text-white font-medium bg-gray-400/10 border border-gray-700/20': activePath === '/instructions',
                  'text-neutral-400 hover:bg-gray-500/10 border border-transparent hover:border-gray-600/20': activePath !== '/instructions',
                })}`}
              >
                <div className="flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 fill-current" />
                  {t('navigation.instructions.title')}
                </div>
                <ChevronDownIcon className="w-5 h-5 fill-current" />
              </button>
            </div>
          </motion.div>
        </motion.nav>
      </div>
    </div>
  )
}

export default MobileNavigation