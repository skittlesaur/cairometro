import { ReactNode, useCallback, useState } from 'react'

import StationCollapsed from '@/components/admin/lines-and-stations/station-collapsed'
import StationExpanded from '@/components/admin/lines-and-stations/station-expanded'
import { UpdateStationVariables } from '@/graphql/stations/update-station'
import StationType from '@/types/station'

import cn from 'classnames'
import { AnimatePresence } from 'framer-motion'

export interface StationProps {
  station: StationType
  isLast?: boolean
  handler?: ReactNode
  optimisticDelete?: (stationId: string)=> Promise<void>
  optimisticUpdate?: (variables: UpdateStationVariables)=> Promise<void>
  expanded?: string | undefined
  setExpanded: (expanded: string | undefined)=> void
}

const Station = ({
  expanded, station, setExpanded, ...restOfProps 
}: StationProps) => {
  const [loadingSave, setLoadingSave] = useState(false)

  const onCardClick = useCallback(() => {
    setExpanded(expanded === station.id ? undefined : station.id)
  }, [expanded, setExpanded, station.id])
  
  return (
    <AnimatePresence mode="wait">
      <div className="relative ml-4">
        <div
          className={cn('absolute w-0.5 bg-gray-200 rounded-full', {
            'h-full': !restOfProps.isLast,
            'h-1/2': restOfProps.isLast,
          })}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-0.5 w-5 bg-gray-200 rounded-full"
        />
        {expanded === station.id ? (
          <StationExpanded
            key={`${station.id}-expanded`}
            {...restOfProps}
            station={station}
            expanded={expanded}
            setExpanded={setExpanded}
            onCardClick={onCardClick}
          />
        ) : (
          <StationCollapsed
            key={`${station.id}-collapsed`}
            {...restOfProps}
            station={station}
            expanded={expanded}
            setExpanded={setExpanded}
            loadingSave={loadingSave}
            optimisticUpdate={async (variables) => {
              setLoadingSave(true)
              try {
                await restOfProps.optimisticUpdate?.(variables)
              } finally {
                setLoadingSave(false)
              }
            }}
            onCardClick={onCardClick}
          />
        )}
      </div>
    </AnimatePresence>
  )
}

export default Station