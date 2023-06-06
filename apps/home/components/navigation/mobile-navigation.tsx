import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { buttonVariants } from '@/components/button'
import HamburgerMenu from '@/components/navigation/hamburger-menu'
import { NavigationProps } from '@/components/navigation/index'
import { Separator } from '@/components/separator'
import UserAvatar from '@/components/user-avatar'
import useUser from '@/graphql/user/me'
import ChatbubblesIcon from '@/icons/chatbubbles.svg'
import ChevronDownIcon from '@/icons/chevron-down.svg'
import DocumentTextIcon from '@/icons/document-text.svg'
import EarthIcon from '@/icons/earth.svg'
import HomeIcon from '@/icons/home.svg'
import Logo from '@/icons/logo.svg'
import TicketIcon from '@/icons/ticket.svg'
import useWindowSize from '@/lib/use-window-size'

import NavigationMenuContent from '@/components/navigation/navigation-content'
import NavigationMenu from '@/components/navigation/navigation-menu'
// import NavigationMenuTrigger from '@/components/navigation/navigation-trigger'
import { NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu'

import AccessibleIcon from '@/icons/accessible.svg'
import AssistWalkerIcon from '@/icons/assist-walker.svg'
import BlindIcon from '@/icons/blind.svg'
import HearingIcon from '@/icons/hearing.svg'

import cn from 'classnames'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

const MobileNavigation = ({ activePath }: NavigationProps) => {
  const [hambugerMenuOpen, setHamburgerMenuOpen] = useState<boolean>(false)
  const { height } = useWindowSize()

  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const { data: user } = useUser()


  const links = [
    {
      name: t('navigation.home'),
      href: '/',
      Icon: HomeIcon,
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
        delay: 0.1,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }

  const instructions = {
    name: t('navigation.instructions.title'),
    content: [
      {
        name: t('navigation.instructions.content.specialNeeds.title'),
        description: t('navigation.instructions.content.specialNeeds.description'),
        href: '/help/instructions/special-needs',
      },
      {
        name: t('navigation.instructions.content.rules.title'),
        description: t('navigation.instructions.content.rules.description'),
        href: '/help/instructions/rules',
      },
      {
        name: t('navigation.instructions.content.linesAndSchedule.title'),
        description: t('navigation.instructions.content.linesAndSchedule.description'),
        href: '/help/instructions/lines-and-schedule',
      },
    ],
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
              'text-black hover:text-black/80 transition-colors delay-[280ms]': !hambugerMenuOpen,
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
              {user ? (
                <div className="flex items-center w-full gap-3">
                  <UserAvatar
                    id={user.id}
                    name={user.name}
                  />
                  <p>
                    {user.name}
                  </p>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'sm',
                      padding: 'sm',
                      className: 'hover:bg-gray-400/10 hover:border-gray-700/20',
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
                </>
              )}
              <button
                className={`text-neutral-300 hover:text-white transition-colors flex items-center gap-2 ${user ? '' : 'col-span-2'} flex-row-reverse`}
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
              <NavigationMenu className='w-full'>
              <NavigationMenuItem className="relative">
          <NavigationMenuTrigger>
          <div
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
              </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            className="rtl:text-right"
          >
            <ul className="text-sm grid grid-cols-[1.25fr_2fr] w-[28em]">
              {instructions.content.map((item, idx) => (
                idx === 0 ? (
                  <li
                    key={item.name}
                    className="relative row-span-2 px-3 py-2 rounded overflow-hidden before:absolute before:inset-0 before:z-[-1] before:bg-gray-300/20 before:backdrop-blur-sm border border-transparent hover:border-gray-300 transition-colors"
                  >
                    <Link
                      href={item.href}
                      className="flex flex-col items-start justify-between gap-4"
                    >
                      <div className="grid grid-cols-2 gap-1 w-[3.75em]">
                        {[AccessibleIcon,
                          HearingIcon,
                          BlindIcon,
                          AssistWalkerIcon].map((Icon, idx) =>
                          (
                            <div
                              key={idx}
                              className="bg-primary p-1 w-6 h-6 rounded"
                              aria-hidden="true"
                            >
                              <Icon className="fill-white" />
                            </div>
                          ))}
                      </div>
                      <div>
                        <p className="font-medium">
                          {item.name}
                        </p>
                        <p className="text-neutral-500 text-xs">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ) : (
                  <li
                    key={item.name}
                    className="p-1 rounded"
                  >
                    <Link
                      href={item.href}
                      className="h-full relative flex flex-col px-3 py-2 rounded group before:absolute before:inset-0 before:z-[-1] hover:before:bg-gray-300/20 hover:before:backdrop-blur-sm transition-colors"
                    >
                      <p className="font-medium text-neutral-600 group-hover:text-black transition-colors">
                        {item.name}
                      </p>
                      <p className="text-neutral-500 group-hover:text-neutral-700 text-xs transition-colors">
                        {item.description}
                      </p>
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        </NavigationMenu>
              
              <Link
                href="/help/chat"
                className={`flex items-center gap-2 text-lg py-2 px-4 rounded transition-colors ${cn({
                  'text-white font-medium bg-gray-400/10 border border-gray-700/20': activePath === '/support',
                  'text-neutral-400 hover:bg-gray-500/10 border border-transparent hover:border-gray-600/20': activePath !== '/support',
                })}`}
              >
                <ChatbubblesIcon className="w-5 h-5 fill-current" />
                {t('navigation.support')}
              </Link>
            </div>
          </motion.div>
        </motion.nav>
      </div>
    </div>
  )
}

export default MobileNavigation