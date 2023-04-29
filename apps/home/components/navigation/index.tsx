import DesktopNavigation from '@/components/navigation/desktop-navigation'
import useWindowSize from '@/lib/use-window-size'

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
        blur: 'before:absolute before:inset-0 before:z-[-1] before:bg-white/80 before:backdrop-blur border-gray-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface NavigationProps extends VariantProps<typeof navigationVariants> {
  activePath?: '/' | '/stations' | '/subscriptions'
}

const Navigation = ({ activePath, variant }: NavigationProps) => {
  const { t } = useTranslation('common')
  const { isDesktop } = useWindowSize()

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
        name: t('navigation.instructions.content.schedule.title'),
        description: t('navigation.instructions.content.schedule.description'),
        href: '/instructions/schedule',
      },
    ],
  }

  return (
    <header className={cn(navigationVariants({ variant }))}>
      {isDesktop ? (
        <DesktopNavigation
          activePath={activePath}
          links={links}
          instructions={instructions}
        />
      ) : (
        <>
        </>
      )}
    </header>
  )
}

export default Navigation