import { useState } from 'react'

import Header from '@/components/admin/header'
import Line from '@/components/admin/lines-and-stations/line'
import LineExpanded from '@/components/admin/lines-and-stations/line-expanded'
import StationExpanded from '@/components/admin/lines-and-stations/station-expanded'
import { Button } from '@/components/button'
import useTotalLinesAndStations from '@/graphql/admin/analytics/total-lines-and-stations'
import adminAddLineMutation, { AddLineVariables } from '@/graphql/lines/add-line'
import useLines from '@/graphql/lines/lines'
import adminUpdateLineMutation, { UpdateLineVariables } from '@/graphql/lines/update-line'
import adminAddStationMutation, { AddStationVariables } from '@/graphql/stations/add-station'
import adminDeleteStationMutation from '@/graphql/stations/delete-station'
import adminUpdateStationMutation, { UpdateStationVariables } from '@/graphql/stations/update-station'
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
      revalidate: true,
    })
  }

  const optimisticUpdateStation = async (variables: UpdateStationVariables) => {
    await mutateLine(async () => {
      await adminUpdateStationMutation(variables)
      const updatedLines = lines?.map((line: LineType) => ({
        ...line,
        sortedStations: line.sortedStations.map((station: StationType) => {
          if (station.id === variables.stationId) {
            return {
              ...station,
              ...variables,
            }
          }
          return station
        }),
      }))
      return updatedLines
    }, {
      optimisticData: lines?.map((line: LineType) => ({
        ...line,
        sortedStations: line.sortedStations.map((station: StationType) => {
          if (station.id === variables.stationId) {
            return {
              ...station,
              ...variables,
            }
          }
          return station
        }),
      })),
      rollbackOnError: true,
      populateCache: true,
      revalidate: true,
    })
  }

  const createNewStation = async (variables: AddStationVariables) => {
    await mutateLine(async () => {
      await adminAddStationMutation(variables)
      const updatedLines = lines?.map((line: LineType) => {
        if (line.id === variables.lineId) {
          return {
            ...line,
            sortedStations: [
              ...line.sortedStations,
              {
                ...variables,
                id: 'new-station',
              },
            ],
          }
        }
        return line
      })
      return updatedLines
    }, {
      optimisticData: lines?.map((line: LineType) => {
        if (line.id === variables.lineId) {
          return {
            ...line,
            sortedStations: [
              ...line.sortedStations,
              {
                ...variables,
                id: 'new-station',
              },
            ],
          }
        }
        return line
      }),
      rollbackOnError: true,
      populateCache: true,
      revalidate: true,
    })
  }
  
  const optimisticUpdateLine = async (variables: UpdateLineVariables) => {
    await mutateLine(async () => {
      await adminUpdateLineMutation(variables)
      const updatedLines = lines?.map((line: LineType) => {
        if (line.id === variables.lineId) {
          return {
            ...line,
            ...variables,
          }
        }
        return line
      })
      return updatedLines
    }, {
      optimisticData: lines?.map((line: LineType) => {
        if (line.id === variables.lineId) {
          return {
            ...line,
            ...variables,
          }
        }
        return line
      })
        .sort((a: LineType, b: LineType) => a.name.localeCompare(b.name)),
      rollbackOnError: true,
      populateCache: true,
      revalidate: true,
    })
  }
  
  const optimisticAddLine = async (variables: AddLineVariables) => {
    await mutateLine(async () => {
      await adminAddLineMutation(variables)
      const updatedLines = [
        ...lines,
        {
          ...variables,
          id: 'new-line',
          sortedStations: [],
        },
      ]
      return updatedLines
    }, {
      optimisticData: [
        ...lines,
        {
          ...variables,
          id: 'new-line',
          sortedStations: [],
        },
      ],
      rollbackOnError: true,
      populateCache: true,
      revalidate: true,
    })
  }

  return (
    <div className="w-full flex flex-col gap-20">
      <Header
        data={data}
        allLoaded={allLoaded}
      />
      <div className="w-full flex flex-col gap-20">
        <div className="flex items-center justify-end">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => setExpanded('add-line')}
            >
              Add Line
            </Button>
            <Button
              variant="outline"
              onClick={() => setExpanded('add-station')}
            >
              Add Station
            </Button>
          </div>
        </div>
        {expanded === 'add-line' && (
          <LineExpanded 
            addNew
            setExpanded={setExpanded}
            line={{ color: '#000' } as LineType}
            optimisticAdd={optimisticAddLine}
          />
        )}
        {expanded === 'add-station' && (
          <StationExpanded
            addNew
            setExpanded={setExpanded}
            station={{} as StationType}
            createNewStation={createNewStation}
            onCardClick={() => setExpanded(undefined)}
          />
        )}
        {lines?.map((line: LineType) => (
          <Line
            key={line.id}
            line={line}
            optimisticDeleteStation={optimisticDeleteStation}
            optimisticUpdateStation={optimisticUpdateStation}
            expanded={expanded}
            setExpanded={setExpanded}
            optimisticUpdateLine={optimisticUpdateLine}
          />
        ))}
      </div>
    </div>
  )
}

export default LinesAndStations