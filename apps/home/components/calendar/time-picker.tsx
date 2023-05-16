import { useState } from 'react'

import cn from 'classnames'
import { motion } from 'framer-motion'

const TimePicker = () => {

  const [selectedMeridiem, setSelectedMeridiem] = useState(true)


  return (
    <div className="flex flex-row justify-between items-center mt-2">
      <div className="pl-1 text-sm font-semibold">Time</div>
      <div className="flex flex-row gap-2">
        <div className="bg-neutral-100 rounded-md text-sm px-3 py-1">00:00</div>
        <div className="flex w-20 bg-neutral-100 rounded-md text-sm text-black relative z-[0] justify-center items-center">
          <motion.div
            animate={{ x: selectedMeridiem ? '0%' : '100%' }}
            transition={{
              type: 'spring', 
              damping: 10,
              mass: 0.4,
              stiffness: 100,
            }}
            className="absolute z-[-1] top-0.5 bottom-0.5 right-1/2 left-0.5 bg-white border border-transparent rounded"
          >
          </motion.div>
          <button
            className={cn('px-2 py-0.5 transition-all', { 'font-semibold': selectedMeridiem })}
            onClick={() => setSelectedMeridiem(true)}
          >AM
          </button>
          <button
            className={cn('px-2 py-0.5 transition-all', { 'font-semibold': !selectedMeridiem })}
            onClick={() => setSelectedMeridiem(false)}
          >PM
          </button>
        
        </div>
      </div>
    </div>
  )
}

export default TimePicker

// px-0.5 py-0.5