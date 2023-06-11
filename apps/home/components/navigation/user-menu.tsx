import { useCallback } from 'react'
import Link from 'next/link'

import UserAvatar from '@/components/user-avatar'
import useUser from '@/graphql/user/me'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import toast from 'react-hot-toast'

type Path = {
  name: string
  href: string
}

const UserMenu = () => {
  const { data: user, mutate: mutateUser } = useUser()
  const { t } = useTranslation('common')
  
  const paths: Path[] = [
    {
      name: t('userMenu.myTickets'),
      href: '/user/tickets',
    },
    {
      name: t('userMenu.mySubscriptions'),
      href: '/user/subscription',
    },
  ]

  const adminPaths: Path[] = [
    {
      name: t('userMenu.adminPanel'),
      href: '/admin',
    },
  ]

  const accountPaths: Path[] = [
    // {
    //   name: 'My Profile',
    //   href: '/user/profile',
    // },
    // {
    //   name: 'Settings',
    //   href: '/user/settings',
    // },
  ]

  const handleLogout = useCallback(async () => {
    try {
      await mutateUser(async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, {
          withCredentials: true,
        })
        return null
      }, {
        optimisticData: null,
        revalidate: true,
        rollbackOnError: true,
      })
    } catch (error) {
      toast.error('Failed to logout, please try again')
    }
  }, [mutateUser])

  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            <UserAvatar
              id={user.id}
              name={user.name}
              image={user.picture}
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-full pt-4 ltr:right-0 rtl:left-0">
            <div className="z-40 overflow-hidden relative flex flex-col gap-2 py-2 rounded min-w-[17em] z-10 before:absolute before:inset-0 before:z-[-1] before:bg-white/80 before:backdrop-blur border border-gray-200 rounded-md shadow-xl">
              {['ADULT', 'SENIOR'].includes(user.role) && (
                <div className="flex flex-col">
                  {paths.map((path) => (
                    <Link
                      key={path.href}
                      href={path.href}
                      className="text-sm font-medium p-3 hover:bg-gray-100"
                    >
                      {path.name}
                    </Link>
                  ))}
                </div>
              )}
              {user.role === 'ADMIN' && (
                <div className="flex flex-col">
                  <p className="px-3 py-1 font-medium text-xs text-gray-500">
                    {t('userMenu.admin')}
                  </p>
                  {adminPaths.map((path) => (
                    <Link
                      key={path.href}
                      href={path.href}
                      className="text-sm font-medium p-3 hover:bg-gray-100"
                    >
                      {path.name}
                    </Link>
                  ))}
                </div>
              )}
              <div className="flex flex-col">
                <p className="px-3 py-1 font-medium text-xs text-gray-500">
                  {t('userMenu.account')}
                </p>
                {accountPaths.map((path) => (
                  <Link
                    key={path.href}
                    href={path.href}
                    className="text-sm font-medium p-3 hover:bg-gray-100"
                  >
                    {path.name}
                  </Link>
                ))}
                <button
                  className="text-sm font-medium p-3 hover:bg-gray-100 m-0 text-left w-full"
                  onClick={handleLogout}
                >
                  {t('userMenu.logout')}
                </button>
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

export default UserMenu