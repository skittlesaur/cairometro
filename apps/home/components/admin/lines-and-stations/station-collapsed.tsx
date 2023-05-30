import { MouseEvent, useCallback, useState } from 'react'

import { StationProps } from '@/components/admin/lines-and-stations/station'
import TrashIcon from '@/icons/trash.svg'

import cn from 'classnames'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface StationCollapsedProps extends StationProps {
  loadingSave: boolean
  onCardClick: ()=> void
}

const StationCollapsed = ({
  station, handler, optimisticDelete, loadingSave, onCardClick,
}: StationCollapsedProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false)


  const onDeleteClick = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }

    try {
      await optimisticDelete?.(station.id)
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
  
  return (
    <motion.button
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('group flex items-center relative w-full ml-5 flex items-center gap-4 justify-between py-4 px-6 rounded-lg border border-transparent hover:border-neutral-200 hover:shadow-lg transition duration-200', {
        'animate-pulse border border-neutral-100': loadingSave,
      })}
      disabled={loadingSave}
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
    </motion.button>
  )
}

export default StationCollapsed