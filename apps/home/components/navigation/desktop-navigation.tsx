import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, buttonVariants } from '@/components/button'
import { NavigationProps } from '@/components/navigation/index'
import NavigationMenuContent from '@/components/navigation/navigation-content'
import NavigationMenu from '@/components/navigation/navigation-menu'
import NavigationMenuTrigger from '@/components/navigation/navigation-trigger'
import { Separator } from '@/components/separator'
import UserAvatar from '@/components/user-avatar'
import useUser from '@/graphql/user/me'
import AccessibleIcon from '@/icons/accessible.svg'
import AssistWalkerIcon from '@/icons/assist-walker.svg'
import BlindIcon from '@/icons/blind.svg'
import HearingIcon from '@/icons/hearing.svg'
import Logo from '@/icons/logo.svg'

import { NavigationMenuItem, NavigationMenuLink } from '@radix-ui/react-navigation-menu'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'

const DesktopNavigation = ({ activePath }: NavigationProps) => {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const { data: user } = useUser()


  const links = [
    {
      name: t('navigation.home'),
      href: '/',
    },
    {
      name: t('navigation.subscriptions'),
      href: '/subscriptions',
    },
  ]

  const instructions = {
    name: t('navigation.instructions.title'),
    content: [
      {
        name: t('navigation.instructions.content.specialNeeds.title'),
        description: t('navigation.instructions.content.specialNeeds.description'),
        href: '/instructions/special-needs',
      },
      {
        name: t('navigation.instructions.content.rules.title'),
        description: t('navigation.instructions.content.rules.description'),
        href: '/instructions/rules',
      },
      {
        name: t('navigation.instructions.content.linesAndSchedule.title'),
        description: t('navigation.instructions.content.linesAndSchedule.description'),
        href: '/instructions/lines-and-schedule',
      },
    ],
  }

  return (
    <div className="hidden lg:grid max-w-screen-xl px-5 min-[1300px]:px-0 mx-auto grid-cols-3">
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
      <NavigationMenu list={{ className: 'rtl:flex-row-reverse' }}>
        {links.map((link) => (
          <NavigationMenuItem key={link.name}>
            <NavigationMenuLink asChild>
              <Link
                href={link.href}
                className={`text-sm transition-colors py-2 px-3 ${cn({
                  'text-black font-medium': link.href === activePath,
                  'text-neutral-600 hover:text-black': link.href !== activePath,
                })}`}
              >
                {link.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger>
            {instructions.name}
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
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/support"
              className={`text-sm transition-colors py-2 px-3 ${cn({
                'text-black font-medium': '/support' === activePath,
                'text-neutral-600 hover:text-black': '/support' !== activePath,
              })}`}
            >
              {t('navigation.support')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
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
        {user ? (
          <UserAvatar
            id={user.id}
            name={user.name}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}

export default DesktopNavigation