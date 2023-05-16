import React, { forwardRef, useImperativeHandle, useState } from 'react'

import cn from 'classnames'
import { format } from 'date-fns'

import CalendarIcon from '../../icons/calendar.svg'

import { Calendar } from './calendar-components'
import { Popover, PopoverContent, PopoverTrigger } from './calendar-popover'
import TimePicker from './time-picker'

const DatePicker = forwardRef((_, ref) => {
  const [date, setDate] = useState<Date>()
  
  const yesterday = new Date()
  yesterday.setDate(new Date().getDate() - 1)
  const disabledDays = { from: new Date(2023, 4, 1), to: yesterday }

  useImperativeHandle(ref, () => ({
    getResult: () => ({
      date,
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
            'w-[280px] justify-start text-left font-normal', 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background', 'border border-input hover:bg-black hover:text-white', 'h-10 py-2 px-4',
            !date && 'text-black'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'd MMMM') + ' at time' : <span>Pick a date</span>}
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
        <TimePicker />
      </PopoverContent>
    </Popover>
  )
})

DatePicker.displayName = 'DatePicker'

export default DatePicker
