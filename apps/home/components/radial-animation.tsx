import { motion } from 'framer-motion'

const Radial = () => {
  return (
    <div className="flex bg-primary w-16 h-16 rounded items-center justify-center relative">
      <p className="text-white text-4xl">M</p>
      <motion.div
        className="rounded-full border-solid border-2 border-primary w-14 h-14 absolute z-[-3]"
        animate={{ width: '10em', height: '10em', opacity: 0 }}
        transition={{
          ease: 'linear',
          duration: 5,
          repeat: Infinity,
          delay: 0,
        }}
      />
      <motion.div
        className="rounded-full border-solid border-2 border-primary w-6 h-6 absolute z-[-2]"
        animate={{ width: '10em', height: '10em', opacity: 0 }}
        transition={{
          ease: 'linear',
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
      />
      <motion.div
        className="rounded-full border-solid border-2 border-primary w-6 h-6 absolute z-[-1]"
        animate={{ width: '10em', height: '10em', opacity: 0 }}
        transition={{
          ease: 'linear',
          duration: 5,
          repeat: Infinity,
          delay: 2,
        }}
      />
    </div>
  )
}

export default Radial
