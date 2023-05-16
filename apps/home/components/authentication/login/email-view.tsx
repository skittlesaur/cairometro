import LoginForm from '@/components/authentication/login/login-form'
import LoginScreenAnimation from '@/components/authentication/login/login-screen-animation'

import { motion } from 'framer-motion'

interface EmailViewProps {
  nextView: (email: string)=> void
}

const EmailView = ({ nextView }: EmailViewProps) => {
  return (
    <motion.div
      key="email-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeIn', duration: 0.25 }}
      className="flex ltr:mr-[calc(-50vw+50%)] rtl:ml-[calc(-50vw+50%)]"
    >
      <LoginForm nextView={nextView} />
      <LoginScreenAnimation />
    </motion.div>
  )
}

export default EmailView