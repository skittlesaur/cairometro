import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'

import useStations from '@/graphql/stations/stations'
import LocationIcon from '@/icons/location.svg'
import Station from '@/types/station'

import Fuse from 'fuse.js'
import { useTranslation } from 'next-i18next'
import OutsideClickHandler from 'react-outside-click-handler'

interface StationInputProps {
  title: string
  placeholder: string
  onSelected?: (station: Station)=> void
}

const StationInput = forwardRef(({ title, placeholder, onSelected }: StationInputProps, ref) => {
  const { i18n } = useTranslation('home')
  const { data: stations } = useStations()
  const [inputValue, setInputValue] = useState<string>('')
  const [suggests, setSuggests] = useState<Station[]>([])
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)

  useImperativeHandle(ref, () => ({
    getResult: () => {
      if (
        selectedStation?.name.toLowerCase() === inputValue.toLowerCase()
        || selectedStation?.name_ar === inputValue
      )
        return selectedStation

      const station = stations?.find((station: Station) => station.name.toLowerCase() === inputValue.toLowerCase() || station.name_ar === inputValue)
      if (station) {
        setSelectedStation(station)
        setInputValue(i18n.language === 'ar' ? station.name_ar : station.name)
        return station
      }

      setSelectedStation(null)
      return null
    },
  }))

  const search = useCallback(() => {
    if (stations && inputValue) {
      const fuse = new Fuse(stations, { keys: ['name', 'name_ar'] })
      const result = fuse.search(inputValue)
        .map((item) => item.item) as Station[]

      setSuggests(result)
    } else {
      setSuggests([])
    }
  }, [stations, inputValue])

  useEffect(() => {
    if (selectedStation?.name === inputValue || selectedStation?.name_ar === inputValue) {
      return
    }
    search()
  }, [inputValue,
    search,
    selectedStation?.name,
    selectedStation?.name_ar])

  return (
    <div className="relative w-full">
      <div className="flex flex-col items-start w-full">
        <label className="text-base font-medium text-base-black block">
          {title}
        </label>
        <input
          placeholder={placeholder}
          className="font-normal text-sm leading-5 text-neutral-500 w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => search()}
          onBlur={() => setTimeout(() => setSuggests([]), 200)}
        />
      </div>
      {suggests.length > 0 && (
        <OutsideClickHandler onOutsideClick={() => setSuggests([])}>
          <div className="absolute top-full w-72 bg-white border rounded-md my-2 md:my-5 shadow-xl flex flex-col items-start max-h-64 overflow-y-auto">
            {suggests.map((station) => (
              <button
                key={station.id}
                className="flex items-center gap-2 w-full hover:bg-neutral-100 p-3"
                onClick={() => {
                  setInputValue(i18n.language === 'ar' ? station.name_ar : station.name)
                  setSelectedStation(station)
                  setSuggests([])
                  if (onSelected) {
                    onSelected(station)
                  }
                }}
              >
                <LocationIcon className="w-5 h-5" />
                <div className="flex flex-col items-start">
                  <p>
                    {i18n.language === 'ar' ? station.name_ar : station.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {i18n.language === 'ar' ? station.name : station.name_ar}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </OutsideClickHandler>
      )}
    </div>
  )
})

StationInput.displayName = 'StationInput'

export default StationInput