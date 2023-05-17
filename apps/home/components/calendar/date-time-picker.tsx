import React, { forwardRef, useImperativeHandle, useState } from 'react'

import cn from 'classnames'
import { format } from 'date-fns'

import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './calendar-popover'
import TimeField from './time-field'

interface DateTimePickerProps {
  from?: Date,
  to?: Date 
}

const DateTimePicker = forwardRef(({ from, to, ..._ }: DateTimePickerProps, ref) => {
  const [date, setDate] = useState<Date>()
  const [meridiem, setMeridiem] = useState(true)
  const [hours, setHours] = useState('01')
  const [minutes, setMinutes] = useState('00')

  const yesterday = new Date()
  yesterday.setDate(new Date().getDate() - 1)

  const firstDayOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  const disabledDays = { from: from ?? firstDayOfCurrentMonth, to: to ?? yesterday }

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
            'w-[240px] text-left font-normal inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-primary text-neutral-500 hover:text-white h-10 py-2 px-4',
            !date && 'text-black'
          )}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {date ? format(date, 'd MMMM') + ' at ' + `${hours}:${minutes} ${meridiem ? 'AM' : 'PM'}` : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          initialFocus
          mode="single"
          fromMonth={new Date()}
          toMonth={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
          disabled={disabledDays}
          selected={date}
          onSelect={setDate}
        />
        <TimeField
          meridiem={meridiem}
          setMeridiem={setMeridiem}
          hours={hours}
          setHours={setHours}
          minutes={minutes}
          setMinutes={setMinutes}
        />
      </PopoverContent>
    </Popover>
  )
})

DateTimePicker.displayName = 'DatePicker'

export default DateTimePicker
