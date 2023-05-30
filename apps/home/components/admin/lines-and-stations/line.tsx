
import LineExpanded from '@/components/admin/lines-and-stations/line-expanded'
import Station from '@/components/admin/lines-and-stations/station'
import { UpdateLineVariables } from '@/graphql/lines/update-line'
import adminReorderStationsMutation from '@/graphql/stations/reorder-station'
import { UpdateStationVariables } from '@/graphql/stations/update-station'
import CreateIcon from '@/icons/create.svg'
import ReorderTwoIcon from '@/icons/reorder-two.svg'
import LineType from '@/types/line'
import StationType from '@/types/station'

import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Nestable from 'react-nestable'

interface LineProps {
  line: LineType
  optimisticDeleteStation: (stationId: string)=> Promise<void>
  optimisticUpdateStation: (variables: UpdateStationVariables)=> Promise<void>
  optimisticUpdateLine: (variables: UpdateLineVariables)=> Promise<void>
  expanded: string | undefined
  setExpanded: (expanded: string | undefined)=> void
}

const Line = ({
  line, expanded, setExpanded, optimisticDeleteStation, optimisticUpdateStation, optimisticUpdateLine, optimisticAddLine,
}: LineProps) => {

  console.log(line)
  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence mode="wait">
        {expanded === line.id ? (
          <LineExpanded
            key={`${line.id}-expanded`}
            line={line}
            setExpanded={setExpanded}
            optimisticUpdate={optimisticUpdateLine}
            optimisticAdd={optimisticAddLine}
          />
        ) : (
          <motion.div
            key={`${line.id}-collapsed`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between gap-1"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-7 h-1 rounded-full"
                style={{
                  background: line.color,
                }}
              />
              <h1 className="text-2xl font-medium">
                {line.name}
              </h1>
            </div>
            <button
              className="flex items-center justify-center p-1 bg-white hover:bg-neutral-100 rounded-full transition duration-200"
              onClick={e => {
                e.stopPropagation()
                setExpanded(line.id)
              }}
            >
              <CreateIcon className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col">
        <Nestable
          items={line.sortedStations}
          maxDepth={1}
          handler={(
            <div
              className="flex items-center justify-center p-1 bg-white hover:bg-neutral-100 rounded-full transition duration-200"
              onClick={e => e.stopPropagation()}
            >
              <ReorderTwoIcon className="w-6 h-6" />
            </div>
          )}
          renderItem={({ item, handler, index }) => (
            <Station
              key={`${item.id}-${expanded === item.id ? 'expanded' : 'collapsed'}`}
              station={item as StationType}
              handler={handler}
              isLast={index === line.stations.length - 1}
              optimisticDelete={optimisticDeleteStation}
              optimisticUpdate={optimisticUpdateStation}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          )}
          onChange={async ({ dragItem, targetPath }) => {
            // targetPath always has length 1 because maxDepth is 1
            const newPosition = targetPath[0]
            
            try {
              await adminReorderStationsMutation({
                lineId: line.id,
                stationId: dragItem.id,
                newPosition,
              })
              toast.success('Station moved successfully')
            } catch (error) {
              toast.error('Unable to move station, please try again later')
            }
          }}
        />
      </div>
    </div>
  )
}

export default Line