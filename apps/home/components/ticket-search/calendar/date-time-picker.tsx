import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ticket-search/calendar/calendar-popover'
import Calendar from '@/components/ticket-search/calendar/index'
import TimeField from '@/components/ticket-search/calendar/time-field'

import cn from 'classnames'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'

interface DateTimePickerProps {
  from?: Date,
  to?: Date 
}

const DateTimePicker = forwardRef(({ from, to, ..._ }: DateTimePickerProps, ref) => {
  
  const { language } = useTranslation('home').i18n

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

  const popoverText =  language === 'ar' ? date ? format(date, 'd MMMM', { locale: ar }) + ' في ' + `${parseInt(hours).toLocaleString('ar-EG').padStart(2, '٠')}:${parseInt(minutes).toLocaleString('ar-EG').padStart(2, '٠')} ${meridiem ? 'ص' : 'م'}` : <span>اختار المعاد</span> : date ? format(date, 'd MMMM') + ' at ' + `${hours}:${minutes} ${meridiem ? 'AM' : 'PM'}` : <span>Pick a date</span> 

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className=""
      >
        <button
          className={cn(
            ' text-left font-normal items-center justify-center text-sm transition-colors border-none text-neutral-500',
            !date && 'text-black'
          )}
        >
          {popoverText}
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
