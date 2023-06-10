import { useState } from 'react'

import EmailView from '@/components/authentication/login/email-view'
import MagicLink from '@/components/authentication/verify/magic-link'
import Otp from '@/components/authentication/verify/otp'

import { AnimatePresence } from 'framer-motion'

export enum LoginViews {
  EMAIL,
  VERIFY_MAGIC_LINK,
  VERIFY_OTP
}

const Login = () => {
  const [view, setView] = useState<LoginViews>(LoginViews.EMAIL)
  const [email, setEmail] = useState('')

  return (
    <AnimatePresence mode="wait">
      {view === LoginViews.EMAIL && (
        <EmailView
          key="email-view"
          nextView={(email: string) => {
            setEmail(email)
            setView(LoginViews.VERIFY_MAGIC_LINK)
          }}
        />
      )}
      {view === LoginViews.VERIFY_MAGIC_LINK && (
        <MagicLink
          key="magic-link-view"
          email={email}
          setViewOtp={() => setView(LoginViews.VERIFY_OTP)}
        />
      )}
      {view === LoginViews.VERIFY_OTP && (
        <Otp
          key="otp-view"
          email={email}
          setViewMagicLink={() => setView(LoginViews.VERIFY_MAGIC_LINK)}
        />
      )}
    </AnimatePresence>
  )
}

export default Login
