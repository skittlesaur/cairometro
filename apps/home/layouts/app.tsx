import Footer from '@/components/footer'
import Navigation, { NavigationProps } from '@/components/navigation'

import { useTranslation } from 'next-i18next'

interface AppLayoutProps {
  children: React.ReactNode
  navigation: NavigationProps
}

const AppLayout = ({ children, navigation }: AppLayoutProps) => {
  const { i18n } = useTranslation('common')

  return (
    <div
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Navigation
        activePath={navigation.activePath}
        variant={navigation.variant}
      />
      <div className="max-w-screen-xl mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout