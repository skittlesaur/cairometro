import { Button } from '@/components/button'
import loginMutation from '@/graphql/user/login'

import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import toast from 'react-hot-toast'

interface MagicLinkProps {
  email: string
  setViewOtp: ()=> void
}

const MagicLink = ({ email, setViewOtp }: MagicLinkProps) => {
  const { t } = useTranslation('login')
  const handleResubmission = async () => {
    try {
      await loginMutation({ email: email })
    } catch (errors) {
      
    
       
      toast.error(`${t('somethingWentWrong')}`)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeIn', duration: 0.25 }}
      className="flex flex-col items-center justify-center h-screen gap-4"
    >
      <p className="text-3xl font-bold text-center">Email Verification</p>
      <p className="text-lg font-medium text-center w-full">
        <span className="text-neutral-500">Keep this window open and in a new tab open the link we just sent to </span>
        <span className="text-primary"> {email}</span>
      </p>
      <div className="flex flex-col items-center justify-center">
        <Button
          variant="linkSecondary"
          className="text-neutral-400 !py-0 "
          onClick={handleResubmission}
        >
          Resend Link
        </Button>
        <Button
          variant="outline"
          size="xxl"
          padding="lg"
          onClick={setViewOtp}
        >
          Verify using OTP
        </Button>
      </div>
    </motion.div>
  )
}

export default MagicLink