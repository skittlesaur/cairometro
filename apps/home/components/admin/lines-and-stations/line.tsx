
import Station from '@/components/admin/lines-and-stations/station'
import adminReorderStationsMutation from '@/graphql/stations/reorder-station'
import ReorderTwoIcon from '@/icons/reorder-two.svg'
import LineType from '@/types/line'
import StationType from '@/types/station'

import toast from 'react-hot-toast'
import Nestable from 'react-nestable'

interface LineProps {
  line: LineType
  optimisticDeleteStation: (stationId: string)=> Promise<void>
  expanded: string | undefined
  setExpanded: (expanded: string | undefined)=> void
}

const Line = ({
  line, optimisticDeleteStation, expanded, setExpanded, 
}: LineProps) => {
  return (
    <div className="flex flex-col gap-2">
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
              station={item as StationType}
              handler={handler}
              isLast={index === line.stations.length - 1}
              optimisticDelete={optimisticDeleteStation}
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