import { Button } from '@/components/button'
import loginMutation from '@/graphql/user/login'
import ArrowBackIcon from '@/icons/arrow-back-outline.svg'

import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import toast from 'react-hot-toast'

import OtpInput from './otp-input'

interface OtpProps {
  email: string
  setViewMagicLink: ()=> void
}

const Otp = ({ email, setViewMagicLink }: OtpProps) => {
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
        <span className="text-neutral-500">Enter below the 4 digits one-time password we sent to </span>
        <span className="text-primary">{email}</span>
        <span className="text-neutral-400 ">. </span>
      </p>
      
      <OtpInput email={email} />
      <div className="flex flex-col items-center justify-center">
        <Button
          variant="linkSecondary"
          className="text-neutral-400 !py-0 "
          onClick={handleResubmission}
        >
          Resend OTP
        </Button>
        <Button
          variant="linkSecondary"
          className="text-neutral-400 !py-0"
          onClick={setViewMagicLink}
        >
          <ArrowBackIcon className=" w-4 fill-neutral-400" /> Verify using magic link
        </Button>
      </div>
    </motion.div>

  )
}

export default Otp