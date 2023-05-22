import Link from 'next/link'

import UserAvatar from '@/components/user-avatar'
import useUser from '@/graphql/user/me'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'

type Path = {
  name: string
  href: string
}

const UserMenu = () => {
  const { data: user } = useUser()
  
  const paths: Path[] = [
    {
      name: 'My Tickets',
      href: '/user/tickets',
    },
    {
      name: 'My Subscription',
      href: '/user/subscription',
    },
  ]

  const adminPaths: Path[] = [
    {
      name: 'Admin Panel',
      href: '/admin',
    },
  ]

  const accountPaths: Path[] = [
    {
      name: 'My Profile',
      href: '/user/profile',
    },
    {
      name: 'Settings',
      href: '/user/settings',
    },
    {
      name: 'Logout',
      href: '/logout',
    },
  ]

  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            <UserAvatar
              id={user.id}
              name={user.name}
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-full pt-4 right-0">
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
                    Admin
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
                  Account
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
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

export default UserMenu