import { MouseEvent, ReactNode, useCallback, useState } from 'react'

import StationExpanded from '@/components/admin/lines-and-stations/station-expanded'
import TrashIcon from '@/icons/trash.svg'
import StationType from '@/types/station'

import cn from 'classnames'
import toast from 'react-hot-toast'

interface StationProps {
  station: StationType
  isLast: boolean
  handler: ReactNode
  optimisticDelete: (stationId: string)=> Promise<void>
  expanded: string | undefined
  setExpanded: (expanded: string | undefined)=> void
}

const Station = ({
  station, isLast = false, handler, optimisticDelete, expanded, setExpanded,
}: StationProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const onDeleteClick = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    
    try {
      await optimisticDelete(station.id)
      toast.success(`${station.name} deleted successfully`)
    } catch (errors) {
      const error = (errors as { message: string }[])[0]
      toast.error(error.message)
    }
    setConfirmDelete(false)
  }, [confirmDelete,
    optimisticDelete,
    station.id,
    station.name])

  const onCardClick = useCallback(() => {
    setExpanded(expanded === station.id ? undefined : station.id)
  }, [expanded, setExpanded, station.id])
  
  if (expanded === station.id) 
    return (
      <StationExpanded
        station={station}
        isLast={isLast}
        handler={handler}
        optimisticDelete={optimisticDelete}
        setExpanded={setExpanded}
        onCardClick={onCardClick}
      />
    )

  return (
    <div
      className="relative ml-4"
    >
      <div
        className={cn('absolute w-0.5 bg-gray-200 rounded-full', {
          'h-full': !isLast,
          'h-1/2': isLast,
        })}
      />
      <div className="absolute top-1/2 -translate-y-1/2 h-0.5 w-5 bg-gray-200 rounded-full" />
      <button
        className="group flex items-center relative w-full ml-5 flex items-center gap-4 justify-between py-4 px-6 rounded-lg border border-transparent hover:border-neutral-200 hover:shadow-lg transition duration-200"
        onMouseLeave={() => setConfirmDelete(false)}
        onClick={onCardClick}
      >
        <div className="flex items-center gap-4">
          <p>
            {station.name}
          </p>
          {station.lines.length > 1 && (
            <div className="flex items-center gap-1">
              {station.lines.sort(
                (a, b) => a.name.localeCompare(b.name),
              ).map((line) => (
                <div
                  key={line.id}
                  className="relative w-2 h-2 rounded-full group/lines"
                  style={{
                    background: line.color,
                  }}
                >
                  <div
                    className="opacity-0 pointer-events-none group-hover/lines:opacity-100 absolute whitespace-nowrap bg-black text-white px-2 py-1 text-xs rounded-full bottom-full -translate-y-2 left-0 -translate-x-1/2 transition duration-200"
                  >
                    {line.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition duration-200">
          <button
            className="flex items-center justify-center p-1 bg-white hover:bg-neutral-100 rounded-full transition duration-200 disabled:opacity-50"
            onClick={onDeleteClick}
          >
            <TrashIcon
              className={cn('w-5 h-5', {
                'fill-red-600': confirmDelete,
              })}
            />
          </button>
          {handler}
        </div>
      </button>
    </div>
  )
}

export default Station