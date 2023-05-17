import { KeyboardEvent, useRef, useState } from 'react'

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
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const minutesRef = useRef<HTMLInputElement>(null)
  const hoursRef = useRef<HTMLInputElement>(null)

  const hoursChangeHandler = () => {

    if (parseInt(hour) === 1 && hours != '01') {
      setHours('01')
      return
    }

    if (parseInt(hour) === 0 && hours === '01'){
      console.log(hour)
      console.log(parseInt(hours))
      setHours('10')
      minutesRef.current?.focus()
      return
    } else if (parseInt(hour) === 1){
      setHours('11')
      minutesRef.current?.focus()
      return
    } else if (parseInt(hour) === 2 && hours === '01'){
      setHours('12')
      minutesRef.current?.focus()
      return
    }  

    if (parseInt(hour) <= 9 && parseInt(hour) > 1) {
      setHours(`0${hour}`)
      minutesRef.current?.focus()
      return
    }

  }

  const minutesChangeHandler = () => {
    if (!parseInt(minute) && parseInt(minute) != 0) return 
    
    if (minutes === '00' || parseInt(minutes) >= 6){
      switch (parseInt(minute)){
      case 0:
        setMinutes(`0${minute}`)
        minutesRef.current?.blur()
        return
      case 6:
        setMinutes(`0${minute}`)
        minutesRef.current?.blur()
        return
      case 7:
        setMinutes(`0${minute}`)
        minutesRef.current?.blur()
        return
      case 8:
        setMinutes(`0${minute}`)
        minutesRef.current?.blur()
        return
      case 9:
        setMinutes(`0${minute}`)
        minutesRef.current?.blur()
        return
      default: 
        setMinutes(`0${minute}`)
        return
      }}

    
    setMinutes(`${parseInt(minutes)}${minute}`)
    minutesRef.current?.blur()
    return
    

  }

  return (
    <div className="flex flex-row justify-between items-center mt-2">
      <div className="pl-1 text-sm font-semibold">Time</div>
      <div className="flex flex-row gap-2">
        <div className="bg-neutral-100 rounded-md text-sm px-2 py-1">
          <input
            ref={hoursRef}
            className="w-5 bg-transparent text-center focus-visible:ring-0 focus-visible:ring-offset-0"
            value={hours}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => setHour(e.key)}
            onChange={hoursChangeHandler}
          />
          :
          <input
            ref={minutesRef}
            className="w-5 bg-transparent text-center focus-visible:ring-0 focus-visible:ring-offset-0"
            value={minutes}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => setMinute(e.key)}
            onChange={minutesChangeHandler}
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
