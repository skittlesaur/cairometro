import Hero from '@/components/help/hero'
import HelpNavigation from '@/components/help/navigation'

import cn from 'classnames'

interface HelpLayoutProps {
  headerChildren?: React.ReactNode
  children: React.ReactNode
  contentBackground?: `bg-${string}`
}

const HelpLayout = ({ headerChildren, children, contentBackground }: HelpLayoutProps) => {
  return (
    <div className={cn('min-h-screen overflow-x-hidden flex flex-col gap-16 md:gap-20 pb-16 md:pb-40', contentBackground)}>
      <HelpNavigation />
      <Hero>
        {headerChildren}
      </Hero>
      <div className="w-full grow max-w-screen-lg px-4 min-[1300px]:mx-auto help-content flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}

export default HelpLayout