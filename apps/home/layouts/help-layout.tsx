import Hero from '@/components/help/hero'
import HelpNavigation from '@/components/help/navigation'

interface HelpLayoutProps {
  headerChildren?: React.ReactNode
  children: React.ReactNode
}

const HelpLayout = ({ headerChildren, children }: HelpLayoutProps) => {
  return (
    <div className="overflow-x-hidden flex flex-col gap-16 md:gap-20 mb-16 md:mb-40">
      <HelpNavigation />
      <Hero>
        {headerChildren}
      </Hero>
      <div className="w-full max-w-screen-lg px-4 min-[1300px]:mx-auto help-content flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}

export default HelpLayout