import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import cn from 'classnames'
import { format } from 'date-fns'

import CalendarIcon from '../../icons/calendar.svg'

import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './calendar-popover'
import TimeField from './time-field'

export type DatePickerRefType = {
  getMeridiem: ()=> boolean
  getHours: ()=> string
  getMinutes: ()=> string
}

const DateTimePicker = forwardRef((_, ref) => {
  const [date, setDate] = useState<Date>()
  
  
  const yesterday = new Date()
  yesterday.setDate(new Date().getDate() - 1)
  const disabledDays = { from: new Date(2023, 4, 1), to: yesterday }

  const timeFieldRef = useRef<DatePickerRefType>(null)

  const meridiem = timeFieldRef.current?.getMeridiem()
  const hours = timeFieldRef.current?.getHours()
  const minutes = timeFieldRef.current?.getMinutes()

  useImperativeHandle(ref, () => ({
    getResult: () => ({
      date,
      meridiem,
      hours,
      minutes,
    }),
  }))

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="hover:bg-black"
      >
        <button
          className={cn(
            'w-[280px] text-left font-normal inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-black text-neutral-500 hover:text-white h-10 py-2 px-4',
            !date && 'text-black'
          )}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {date ? format(date, 'd MMMM') + ' at ' + `${hours.hours}:${minutes.minutes} ${meridiem ? 'AM' : 'PM'}` : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          initialFocus
          mode="single"
          fromMonth={new Date()}
          disabled={disabledDays}
          selected={date}
          onSelect={setDate}
        />
        <TimeField  ref={timeFieldRef} />
      </PopoverContent>
    </Popover>
  )
})

DateTimePicker.displayName = 'DatePicker'

export default DateTimePicker
