import Navigation, { NavigationProps } from '@/components/navigation'

import { useTranslation } from 'next-i18next'

interface AppLayoutProps extends NavigationProps {
  children: React.ReactNode
}

const AppLayout = ({ children, activePath, variant }: AppLayoutProps) => {
  const { i18n } = useTranslation('common')

  return (
    <div
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Navigation
        activePath={activePath}
        variant={variant}
      />
      {children}
    </div>
  )
}

export default AppLayout