import { motion } from 'framer-motion'

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
      className="flex flex-col items-center justify-center h-screen"
    >
      verify otp {email}
      <button onClick={setViewMagicLink}>
        setViewMagicLink
      </button>
    </motion.div>
  )
}

export default Otp