import { cva, VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'

const LoaderVariants = cva(
  'rounded-full',
  {
    variants: {
      size: {
        sm: 'w-2 h-2',
        md: 'w-4 h-4',
        lg: 'w-6 h-6',
      },
      color: {
        primary: 'bg-primary',
        white: 'bg-white',
        
      },
    },
    defaultVariants: {
      size: 'sm',
      color: 'primary',
    },
  }
)
const Loader = ({ size, color }: VariantProps<typeof LoaderVariants>) => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const loadingCircleVariants = {
    start: {
      y: '50%',
    },
    end: {
      y: '-50%',
    },
  }

  const loadingCircleTransition: {
    duration: number
    repeat: number
    repeatType: 'reverse'
    ease: string
  } = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  }

  return (
    <motion.div
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
      className="flex justify-center items-center gap-1 h-full"
    >
      {[...Array(3)].map((_, index) => (
        <motion.span
          key={index}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
          className={LoaderVariants({ size, color })}
        />
      ))}
    </motion.div>
  )
}

export default Loader