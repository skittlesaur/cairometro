import { Button } from '@/components/button'
import ArrowBackIcon from '@/icons/arrow-back-outline.svg'

import { motion } from 'framer-motion'

import OtpInput from './otp-input'

interface OtpProps {
  email: string
  setViewMagicLink: ()=> void
}

const Otp = ({ email, setViewMagicLink }: OtpProps) => {
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
      </p>
      <OtpInput email={email} />
      <Button
        variant="linkSecondary"
        className="text-neutral-400"
        onClick={setViewMagicLink}
      >
        <ArrowBackIcon className=" w-4 fill-neutral-400" /> Verify using magic link
      </Button>
    </motion.div>

  )
}

export default Otp