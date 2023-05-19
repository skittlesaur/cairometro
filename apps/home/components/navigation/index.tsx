import DesktopNavigation from '@/components/navigation/desktop-navigation'
import MobileNavigation from '@/components/navigation/mobile-navigation'

import { cva, VariantProps } from 'class-variance-authority'
import cn from 'classnames'

const navigationVariants = cva(
  'w-full border-b p-2 fixed top-0 z-50',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200',
        transparent: 'bg-transparent',
        blur: 'before:absolute before:inset-0 before:z-[-1] before:bg-white/80 before:backdrop-blur border-gray-200',
        'blur-sm': 'before:absolute before:inset-0 before:z-[-1] before:bg-white/80 before:backdrop-blur-sm border-gray-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface NavigationProps extends VariantProps<typeof navigationVariants> {
  activePath?: '/' | '/support' | '/subscriptions' | '/instructions' | `/${string}`
}

const Navigation = ({ activePath, variant }: NavigationProps) => {
  return (
    <header className={cn(navigationVariants({ variant }))}>
      <DesktopNavigation activePath={activePath} />
      <MobileNavigation activePath={activePath} />
    </header>
  )
}

export default Navigation