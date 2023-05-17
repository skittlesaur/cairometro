import { ChangeEvent, useRef } from 'react'

import cn from 'classnames'
import { motion } from 'framer-motion'

interface TimeFieldProps {
  meridiem: boolean,
  setMeridiem: (meridiem: boolean)=> void,
  hours: string,
  setHours: (hour: string)=> void,
  minutes: string,
  setMinutes: (minute: string)=> void
}

const TimeField = ({
  meridiem, setMeridiem, hours, setHours, minutes, setMinutes, ..._ 
}: TimeFieldProps) => {
  const minutesRef = useRef<HTMLInputElement>(null)

  const hoursChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const hour = e.target.value

    if (parseInt(hour) <= 9 && parseInt(hour) > 1 && Number.isNaN(parseInt(hours))) {
      setHours(`0${hour}`)
      minutesRef.current?.focus()
      return
    }

    if (parseInt(hour) === 1 && Number.isNaN(parseInt(hours))) {
      setHours('01')
      return
    }

    if (parseInt(hour) === 10){
      console.log(hour)
      console.log(parseInt(hours))
      setHours('10')
      minutesRef.current?.focus()
      return
    } else if (parseInt(hour) === 11){
      setHours('11')
      minutesRef.current?.focus()
      return
    } else if (parseInt(hour) === 12){
      setHours('12')
      minutesRef.current?.focus()
      return
    }  
  }

  const minutesChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const minutesInput = e.target.value 
    
    if (Number.isNaN(parseInt(minutes))){
      switch (Number.isNaN(parseInt(minutes))){
      case (parseInt(minutesInput) === 6):
        setMinutes(`0${minutesInput}`)
        minutesRef.current?.blur()
        return
      case (parseInt(minutesInput) === 7):
        setMinutes(`0${minutesInput}`)
        minutesRef.current?.blur()
        return
      case (parseInt(minutesInput) === 8):
        setMinutes(`0${minutesInput}`)
        minutesRef.current?.blur()
        return
      case (parseInt(minutesInput) === 9):
        setMinutes(`0${minutesInput}`)
        minutesRef.current?.blur()
        return
      default: 
        setMinutes(`0${minutesInput}`)
        return
      }}

    if (parseInt(minutes) < 6) {
      setMinutes((prevState: string) =>
      { 
        return `${parseInt(prevState)}${minutesInput[2]}`
      })
      minutesRef.current?.blur()
      return
    }

  }

  return (
    <div className="flex flex-row justify-between items-center mt-2">
      <div className="pl-1 text-sm font-semibold">Time</div>
      <div className="flex flex-row gap-2">
        <div className="bg-neutral-100 rounded-md text-sm px-2 py-1">
          <input
            className="w-5 bg-transparent text-center focus-visible:ring-0 focus-visible:ring-offset-0"
            value={hours}
            onClick={() => setHours('')}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              hoursChangeHandler(e)}
          />
          :
          <input
            ref={minutesRef}
            className="w-5 bg-transparent text-center focus-visible:ring-0 focus-visible:ring-offset-0"
            value={minutes}
            onFocus={() => setMinutes('')}
            onClick={() => setMinutes('')}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
            {minutesChangeHandler(e) 
            }}
          />
        </div>
        <div className="flex w-20 bg-neutral-100 rounded-md text-sm text-black relative z-[0] justify-center items-center">
          <motion.div
            animate={{ x: meridiem ? '0%' : '100%' }}
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
            className={cn('px-2 py-0.5 transition-all', {
              'font-semibold': meridiem,
            })}
            onClick={() => setMeridiem(true)}
          >
            AM
          </button>
          <button
            className={cn('px-2 py-0.5 transition-all', {
              'font-semibold': !meridiem,
            })}
            onClick={() => setMeridiem(false)}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimeField
