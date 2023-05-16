import React, { useState } from 'react'

import cn from 'classnames'
import { format } from 'date-fns'

import CalendarIcon from '../../icons/calendar.svg'

import { Button } from './calendar-buttons'
import { Calendar } from './calendar-components'
import { Popover, PopoverContent, PopoverTrigger } from './calendar-popover'

const DatePicker = () => {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-black'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          initialFocus
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
