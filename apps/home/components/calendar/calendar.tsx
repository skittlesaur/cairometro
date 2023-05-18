import cn from 'classnames'
import { format } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'
import { DateFormatter, DayPicker, WeekNumberFormatter } from 'react-day-picker'
import { useTranslation } from 'react-i18next'

import ChevronLeft from '../../icons/chevron-left.svg'
import ChevronRight from '../../icons/chevron-right.svg'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {

  const { language } = useTranslation('home').i18n

  const formatWeekdayName: DateFormatter = (weekday) => {
    switch (weekday.getDay()){
    case 0:
      return 'SUN'
    case 1:
      return 'MON'
    case 2:
      return 'TUE'
    case 3:
      return 'WED'
    case 4:
      return 'THU'
    case 5:
      return 'FRI'
    case 6:
      return 'SAT'
    }
  }

  const NU_LOCALE = 'ar-u-nu-arab'

  const formatDay: DateFormatter = (day) =>
    day.getDate().toLocaleString(NU_LOCALE)

  const formatWeekNumber: WeekNumberFormatter = (weekNumber) => {
    return weekNumber.toLocaleString(NU_LOCALE)
  }

  const formatCaption: DateFormatter = (date, options) => {
    const y = date.getFullYear().toLocaleString(NU_LOCALE)
    const m = format(date, 'LLLL', { locale: options?.locale })
    return `${m} ${y.replace('٬', '')}`
  }

  return (
    <DayPicker
      locale={language === 'ar' ? ar : enUS}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      formatters={language === 'ar' ? { formatDay, formatCaption, formatWeekNumber } : { formatWeekdayName }}
      showOutsideDays={showOutsideDays}
      className={cn('', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-2',
        caption: 'flex flow-row justify-between pl-1 pr-1',
        caption_label: 'text-sm font-semibold',
        nav: 'flex flex-row flex items-center gap-2',
        nav_button_previous: 'rounded-full hover:bg-neutral-100 group',
        nav_button_next: 'rounded-full hover:bg-neutral-100 group',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex gap-1',
        head_cell: 'text-neutral-400/60 w-9 font-normal text-xs',
        row: 'flex w-full mt-1 gap-1',
        cell: 'text-center text-large p-0 relative focus-within:relative focus-within:z-20',
        day: 'h-9 w-9 p-0 aria-selected:opacity-100 rounded-full hover:bg-neutral-100 hover:font-medium',
        day_selected:
          'text-primary font-medium bg-primary/10 rounded-full hover:bg-primary/10 hover:font-medium',
        day_today: 'text-primary',
        day_outside: 'invisible',
        day_disabled: 'text-neutral-400 hover:bg-white hover:font-normal',
        day_range_middle:
          '',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._ }) => <ChevronLeft className={cn('h-4 w-4 text-primary translate-x-[-0.75px] group-disabled:text-neutral-400 group-disabled:hover:bg-white group-disabled:hover:rounded-full group-disabled:opacity-100')} />,
        IconRight: ({ ..._ }) => <ChevronRight className="h-4 w-4 text-primary translate-x-[0.75px] group-disabled:text-neutral-400 group-disabled:hover:bg-white group-disabled:hover:rounded-full group-disabled:opacity-100" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }