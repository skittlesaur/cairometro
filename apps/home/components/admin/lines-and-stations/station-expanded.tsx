import { useCallback, useMemo, useState } from 'react'

import ChangeIndicator from '@/components/admin/change-indicator'
import { StationProps } from '@/components/admin/lines-and-stations/station'
import { Button } from '@/components/button'
import Input from '@/components/input'
import useLines from '@/graphql/lines/lines'
import { UpdateStationVariables } from '@/graphql/stations/update-station'
import ChevronDownIcon from '@/icons/chevron-down.svg'
import mapOptions from '@/lib/map-options'
import LineType from '@/types/line'

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import process from 'process'
import toast from 'react-hot-toast'

interface StationExpandedProps extends StationProps {
  onCardClick: ()=> void
}

const StationExpanded = ({
  station, setExpanded, optimisticUpdate, onCardClick,
}: StationExpandedProps) => {
  const [confirmDiscard, setConfirmDiscard] = useState(false)
  const [stationEdit, setStationEdit] = useState(station)
  const [linesExpanded, setLinesExpanded] = useState(false)
  const { data: lines } = useLines()
  
  const nameChanged = station.name !== stationEdit.name
  const nameArChanged = station.name_ar !== stationEdit.name_ar
  const linesChanged = station.lines.map(line => line.id).join(',') !== stationEdit.lines.map(line => line.id).join(',')
  const locationChanged = Object.values(station?.locationLngLat ?? {}).join(',') !== Object.values(stationEdit?.locationLngLat ?? {}).join(',')
  
  const mapCenter = useMemo(() => {
    if (stationEdit?.locationLngLat) return stationEdit.locationLngLat
    return {
      lat: 30.02,
      lng: 31.25,
    }
  }, [stationEdit])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  })

  const onSaveClick = useCallback(async () => {
    if (!nameChanged && !nameArChanged && !linesChanged && !locationChanged){
      toast('No changes to save', { icon: '👌' })
      setExpanded(undefined)
      return
    }

    try {
      setExpanded(undefined)

      const vars: UpdateStationVariables = {
        stationId: station.id,
      }

      if (nameChanged) vars.name = stationEdit.name
      if (nameArChanged) vars.name_ar = stationEdit.name_ar
      if (linesChanged) vars.lineIds = stationEdit.lines.map(line => line.id)
      if (locationChanged) vars.locationLngLat = stationEdit.locationLngLat
      
      await optimisticUpdate(vars)

      toast.success('Station saved successfully')
    } catch (e) {
      setExpanded(station.id)
      toast.error('Failed to save station updates')
    }
  }, [
    linesChanged,
    locationChanged,
    nameArChanged,
    nameChanged,
    optimisticUpdate,
    setExpanded,
    station.id,
    stationEdit.lines,
    stationEdit.locationLngLat,
    stationEdit.name,
    stationEdit.name_ar,
  ])

  const onDiscardClick = useCallback(() => {
    if (!nameChanged && !nameArChanged && !linesChanged && !locationChanged) {
      setStationEdit(station)
      setExpanded(undefined)
      return
    }

    if (!confirmDiscard) {
      setConfirmDiscard(true)
      toast('Click again to discard changes', { icon: '⚠️' })
      return
    }
    
    setExpanded(undefined)
  }, [
    confirmDiscard,
    linesChanged,
    locationChanged,
    nameArChanged,
    nameChanged,
    setExpanded,
    station,
  ])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
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
              Station Name {nameChanged && <ChangeIndicator />}
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
              htmlFor="station-name-ar"
              className="text-sm font-medium text-neutral-500"
            >
              Arabic Station Name {nameArChanged && <ChangeIndicator />}
            </label>
            <Input
              dir="rtl"
              id="station-name-ar"
              placeholder="Arabic Station Name"
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
            Lines {linesChanged && <ChangeIndicator />}
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
        <div className="flex flex-col items-start gap-1">
          <label
            htmlFor="station-lines"
            className="text-sm font-medium text-neutral-500"
          >
            Location {locationChanged && <ChangeIndicator />}
          </label>
          <div className="w-[calc(50%-0.5rem)] min-h-[20em] aspect-video rounded-lg overflow-hidden border border-neutral-200">
            {isLoaded && stationEdit.locationLngLat ? (
              <GoogleMap
                zoom={13}
                center={mapCenter}
                mapContainerClassName="map-container"
                mapContainerStyle={{ position: 'relative', width: '100%', height: '100%' }}
                options={mapOptions}
                onClick={e => setStationEdit({
                  ...stationEdit,
                  locationLngLat: {
                    lng: e.latLng?.lng() ?? 0,
                    lat: e.latLng?.lat() ?? 0,
                  },
                })}
              >
                <Marker
                  draggable
                  position={mapCenter}
                  onDragEnd={e => setStationEdit({
                    ...stationEdit,
                    locationLngLat: {
                      lng: e.latLng?.lng() ?? 0,
                      lat: e.latLng?.lat() ?? 0,
                    },
                  })}
                />
              </GoogleMap>
            ) : (
              <div className="w-full h-full bg-neutral-200 animate-pulse" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <Button
            variant="primary"
            className="w-full"
            onClick={onSaveClick}
          >
            Save Changes
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={onDiscardClick}
          >
            Discard Changes
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default StationExpanded