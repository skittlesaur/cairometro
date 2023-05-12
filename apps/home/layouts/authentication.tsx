import { ReactNode } from 'react'

import AuthenticationNavigation from '@/components/authentication/navigation'

import { useTranslation } from 'next-i18next'

interface AuthenticationProps {
  children: ReactNode
  type: 'Login' | 'Register'
}

const AuthenticationLayout = ({ children, type }: AuthenticationProps) => {
  const { i18n } = useTranslation('common')

  return (
    <div
      className="max-w-screen overflow-hidden"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <AuthenticationNavigation type={type} />
      <div className="max-w-screen-xl mx-auto">{children}</div>
    </div>
  )
}

export default AuthenticationLayout
