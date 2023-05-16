import { motion } from 'framer-motion'

interface radialProps {
  character: string
}
const Radial = ({ character }: radialProps) => {
  return (
    <div className="flex bg-primary w-16 h-16 rounded items-center justify-center relative">
      <p className="text-white text-4xl">{character}</p>
      <motion.div
        className="rounded-full border-solid border-2 border-primary absolute z-[-1]"
        initial={{ width: '0', height: '0', opacity: 1 }}
        animate={{ width: '15em', height: '15em', opacity: 0 }}
        transition={{
          ease: 'linear',
          duration: 3,
          repeat: Infinity,
          delay: 0,
        }}
      />
      <motion.div
        className="rounded-full border-solid border-2 border-primary absolute z-[-1]"
        initial={{ width: '0', height: '0', opacity: 1 }}
        animate={{ width: '15em', height: '15em', opacity: 0 }}
        transition={{
          ease: 'linear',
          duration: 3,
          repeat: Infinity,
          delay: 1,
        }}
      />
      <motion.div
        className="rounded-full border-solid border-2 border-primary absolute z-[-1]"
        initial={{ width: '0', height: '0', opacity: 1 }}
        animate={{ width: '15em', height: '15em', opacity: 0 }}
        transition={{
          ease: 'linear',
          duration: 3,
          repeat: Infinity,
          delay: 2,
        }}
      />
    </div>
  )
}

export default Radial
