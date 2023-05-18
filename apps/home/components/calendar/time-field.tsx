import { KeyboardEvent, useRef, useState } from 'react'

import cn from 'classnames'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface TimeFieldProps {
  meridiem: boolean
  setMeridiem: (meridiem: boolean)=> void
  hours: string
  setHours: (hour: string)=> void
  minutes: string
  setMinutes: (minute: string)=> void
}

const TimeField = ({
  meridiem,
  setMeridiem,
  hours,
  setHours,
  minutes,
  setMinutes,
  ..._
}: TimeFieldProps) => {
  const { language } = useTranslation('home').i18n

  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const minutesRef = useRef<HTMLInputElement>(null)
  const hoursRef = useRef<HTMLInputElement>(null)

  const hoursAccordingToLocale =
    language === 'ar'
      ? parseInt(hours).toLocaleString('ar-EG').padStart(2, '٠')
      : hours

  const minutesAccordingToLocale =
    language === 'ar'
      ? parseInt(minutes).toLocaleString('ar-EG').padStart(2, '٠')
      : minutes

  const hoursChangeHandler = () => {
    if (parseInt(hour) < 3 && hours === '01') {
      setHours(`1${hour}`)
      minutesRef.current?.focus()
      return
    } else if (parseInt(hour) === 1) {
      setHours(`0${hour}`)
      return
    } else if (parseInt(hour) <= 9) {
      setHours(`0${hour}`)
      minutesRef.current?.focus()
      return
    }
  }

  const minutesChangeHandler = () => {
    if (!parseInt(minute) && parseInt(minute) != 0) return

    if (minutes === '00' || parseInt(minutes) >= 6) {
      switch (parseInt(minute)) {
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
      }
    }

    setMinutes(`${parseInt(minutes)}${minute}`)
    minutesRef.current?.blur()
    return
  }

  return (
    <div
      className={cn(
        'flex justify-between items-center mt-2',
        language === 'ar' ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div
        className={cn(
          'text-sm font-semibold',
          language === 'ar' ? 'pr-2' : 'pl-1' 
        )}
      >
        {language === 'ar' ? 'الوقت' : 'Time'}
      </div>
      <div
        className={cn(
          'flex flex-row gap-2',
          language === 'ar' ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <div className="bg-neutral-100 rounded-md text-sm px-2 py-1">
          <input
            ref={hoursRef}
            className="w-5 bg-transparent text-center focus-visible:ring-0 focus-visible:ring-offset-0"
            value={hoursAccordingToLocale}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => setHour(e.key)}
            onChange={hoursChangeHandler}
          />
          :
          <input
            ref={minutesRef}
            className="w-5 bg-transparent text-center focus-visible:ring-0 focus-visible:ring-offset-0"
            value={minutesAccordingToLocale}
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
            {language === 'ar' ? 'ص' : 'AM'}
          </button>
          <button
            className={cn('px-2 py-0.5 transition-all', {
              'font-semibold': !meridiem,
            })}
            onClick={() => setMeridiem(false)}
          >
            {language === 'ar' ? 'م' : 'PM'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimeField
