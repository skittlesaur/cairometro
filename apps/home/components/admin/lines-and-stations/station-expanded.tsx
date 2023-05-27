import { ReactNode, useState } from 'react'

import Input from '@/components/input'
import useLines from '@/graphql/lines/lines'
import ChevronDownIcon from '@/icons/chevron-down.svg'
import LineType from '@/types/line'
import StationType from '@/types/station'

import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

interface StationProps {
  station: StationType
  isLast: boolean
  handler: ReactNode
  optimisticDelete: (stationId: string)=> Promise<void>
  setExpanded: (expanded: string | undefined)=> void
  onCardClick: ()=> void
}
const StationExpanded = ({
  station, isLast = false, onCardClick,
}: StationProps) => {
  const [stationEdit, setStationEdit] = useState(station)
  const [linesExpanded, setLinesExpanded] = useState(false)
  const { data: lines } = useLines()
  
  const nameChanged = station.name !== stationEdit.name
  const nameArChanged = station.name_ar !== stationEdit.name_ar
  const linesChanged = station.lines.map(line => line.id).join(',') !== stationEdit.lines.map(line => line.id).join(',')

  return (
    <div
      className="relative ml-4 z-10"
    >
      <div
        className={cn('absolute w-0.5 bg-gray-200 rounded-full', {
          'h-full': !isLast,
          'h-1/2': isLast,
        })}
      />
      <div className="absolute top-1/2 -translate-y-1/2 h-0.5 w-5 bg-gray-200 rounded-full" />
      <div
        className="group relative w-full ml-5 py-6 px-6 rounded-lg border border-neutral-200 shadow-lg transition duration-200"
        onClick={onCardClick}
      >
        <div
          className="flex flex-col gap-6"
          onClick={e => e.stopPropagation()}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="station-name"
                className="text-sm font-medium text-neutral-500"
              >
                Station Name {nameChanged && '*'}
              </label>
              <Input
                dir="ltr"
                id="station-name"
                placeholder="Station name"
                value={stationEdit.name}
                className="font-medium"
                onChange={e => setStationEdit({
                  ...stationEdit,
                  name: e.target.value,
                })}
              />
            </div>
            <div className="flex flex-col items-end gap-1">
              <label
                htmlFor="station-name"
                className="text-sm font-medium text-neutral-500"
              >
                Arabic Station Name {nameArChanged && '*'}
              </label>
              <Input
                dir="rtl"
                id="station-name"
                placeholder="Station name"
                value={stationEdit.name_ar}
                className="font-medium"
                onChange={e => setStationEdit({
                  ...stationEdit,
                  name_ar: e.target.value,
                })}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="station-lines"
              className="text-sm font-medium text-neutral-500"
            >
              Lines {linesChanged && '*'}
            </label>
            <div className="relative w-full">
              <button 
                className={cn('flex items-center justify-between gap-2 h-10 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2', {
                  'ring-2 ring-primary ring-offset-2': linesExpanded,
                })}
                onClick={() => setLinesExpanded(!linesExpanded)}
              >
                <p>
                  {stationEdit.lines.length === 0 ? (
                    'Select lines'
                  ) : (
                    stationEdit.lines.map(line => line.name).join(', ')
                  )}
                </p>
                <div>
                  <ChevronDownIcon className="w-4 h-4 text-neutral-500" />
                </div>
              </button>
              <AnimatePresence>
                {linesExpanded && (
                  <motion.div
                    key="change-lines"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-full z-30"
                  >
                    <div className="overflow-hidden shadow-xl bg-white flex flex-col w-full rounded-md border border-neutral-300 bg-transparent">
                      {lines.map((line: LineType) => (
                        <button
                          key={line.id}
                          className={cn('flex items-center gap-2 hover:bg-neutral-100 px-3 py-2', {
                            'opacity-50': !stationEdit.lines.find(l => l.id === line.id),
                          })}
                          onClick={() => setStationEdit({
                            ...stationEdit,
                            lines: stationEdit.lines.find(l => l.id === line.id)
                              ? stationEdit.lines.filter(l => l.id !== line.id)
                              : [...stationEdit.lines, line],
                          })}
                        >
                          <div
                            className="w-7 h-1.5 rounded-full"
                            style={{
                              backgroundColor: line.color,
                            }}
                          />
                          <p>{line.name}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StationExpanded