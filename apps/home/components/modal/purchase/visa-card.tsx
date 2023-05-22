import LogoVisa from '@/icons/logo-visa-current-color.svg'
import VisaEffect from '@/icons/visa-effect.svg'

import { motion } from 'framer-motion'

interface DefaultCardProps {
  validThru?: string
  cardHolder?: string
  formattedCardNumber?: string
}
const VisaCard = ({ validThru, cardHolder, formattedCardNumber }: DefaultCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.1 }}
      className="relative z-[1] bg-gradient-to-br from-[#52B6FE] to-[#6154FE] text-white p-8 flex flex-col justify-end w-full md: min-h-40 aspect-video rounded-2xl font-mono"
    >
      <p className="text-sm">
        {validThru || 'MM/YY'}
      </p>
      <h1 className="text-lg uppercase">
        {cardHolder || 'Card Holder'}
      </h1>
      <p>
        {formattedCardNumber}
      </p>
      <div className="absolute inset-0 z-[-1]">
        <VisaEffect />
      </div>
      <LogoVisa className="absolute w-16 h-16 top-2 right-5" />
    </motion.div>
  )
}

export default VisaCard