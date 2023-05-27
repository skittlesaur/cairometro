import { useState } from 'react'

import Header from '@/components/admin/header'
import Line from '@/components/admin/lines-and-stations/line'
import useTotalLinesAndStations from '@/graphql/admin/analytics/total-lines-and-stations'
import useLines from '@/graphql/lines/lines'
import adminDeleteStationMutation from '@/graphql/stations/delete-station'
import AnalyticsOutlineIcon from '@/icons/analytics-outline.svg'
import LocationOutlineIcon from '@/icons/location-outline.svg'
import NavigateOutlineIcon from '@/icons/navigate-outline.svg'
import TrainOutlineIcon from '@/icons/train-outline.svg'
import LineType from '@/types/line'
import StationType from '@/types/station'

const LinesAndStations = () => {
  const [expanded, setExpanded] = useState<string>()
  const { data: lines, mutate: mutateLine } = useLines()
  const { data: totalLinesAndStations } = useTotalLinesAndStations()

  const allLoaded = totalLinesAndStations
  
  const data = [
    {
      title: 'Active Lines and Stations',
      value: `${totalLinesAndStations?.totalLines} Lines, ${totalLinesAndStations?.totalStations} Stations`,
      icon: AnalyticsOutlineIcon,
    },
    {
      title: 'Most Used Line',
      value: 'Line 1',
      icon: TrainOutlineIcon,
    },
    {
      title: 'Most Departures',
      value: 'Helwan',
      icon: NavigateOutlineIcon,
    },
    {
      title: 'Most Destinations',
      value: 'Maadi',
      icon: LocationOutlineIcon,
    },
  ]

  const optimisticDeleteStation = async (stationId: string) => {
    await mutateLine(async () => {
      await adminDeleteStationMutation({ stationId })
      const updatedLines = lines?.map((line: LineType) => ({
        ...line,
        sortedStations: line.sortedStations.filter((station: StationType) => station.id !== stationId),
      }))
      return updatedLines
    }, {
      optimisticData: lines?.map((line: LineType) => ({
        ...line,
        sortedStations: line.sortedStations.filter((station: StationType) => station.id !== stationId),
      })),
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    })
  }


  return (
    <div className="w-full flex flex-col gap-20">
      <Header
        data={data}
        allLoaded={allLoaded}
      />
      <div className="w-full flex flex-col gap-20">
        {lines?.map((line: LineType) => (
          <Line
            key={line.id}
            line={line}
            optimisticDeleteStation={optimisticDeleteStation}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        ))}
      </div>
    </div>
  )
}

export default LinesAndStations