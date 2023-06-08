import { Button } from '@/components/button'

import { motion } from 'framer-motion'

import VerifyScreenAnimation from './verify-screen-animation'
interface MagicLinkProps {
  email: string
  setViewOtp: ()=> void
}

const MagicLink = ({ email, setViewOtp }: MagicLinkProps) => {
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
      <Button 
        variant="outline"
        size="xxl"
        padding="lg"
        onClick={setViewOtp}
      >
        Verify using OTP
      </Button>
      {/* <VerifyScreenAnimation /> */}
    </motion.div>
  )
}

export default MagicLink