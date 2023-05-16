import { motion } from 'framer-motion'

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
      className="flex flex-col items-center justify-center h-screen"
    >
      verify magic link {email}
      <button onClick={setViewOtp}>
        setViewOtp
      </button>
    </motion.div>
  )
}

export default MagicLink