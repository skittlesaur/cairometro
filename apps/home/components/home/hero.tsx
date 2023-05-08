import { useMemo } from 'react'

import { Button } from '@/components/button'

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import * as process from 'process'

import { Separator } from '../separator'

const Hero = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  })

  const center = useMemo(() => ({ lat: 30.0444, lng: 31.2357 }), [])


  return (
    <div className="w-screen mx-[calc((100vw-100%)/-2+8px)]">
      <div className="relative">
        {isLoaded ? (
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
            mapContainerStyle={{ position: 'relative', width: '100vw', height: '80vh' }}
            options={{ mapId: process.env.NEXT_PUBLIC_MAP_ID }}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <div className="w-full h-[80vh] bg-neutral-300 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
      </div>
      <div className="-translate-y-1/2 flex md:flex-row justify-between flex-col items-center border border-neutral-300 rounded-lg shadow-xl bg-white px-9 py-7 mx-auto max-w-[1300px]">
        <div>
          <label className="text-base font-medium text-base-black block">
            From
          </label>
          <input
            placeholder="Departure"
            className="font-normal text-sm leading-5 text-neutral-500"
          />
        </div>
        <Separator
          vertical
          className="w-[1px] h-10 bg-neutral-200"
        />
        <div>
          <label className="text-base font-medium text-base-black block">
            To
          </label>
          <input
            placeholder="Destination"
            className="font-normal text-sm leading-5 text-neutral-500"
          />
        </div>
        <Separator
          vertical
          className="w-[1px] h-10 bg-neutral-200"
        />
        <div>
          <label className="text-base font-medium text-base-black block">
            Travel Time
          </label>
          <input
            placeholder="20 March at 14:06"
            className="font-normal text-sm leading-5 text-neutral-500"
          />
        </div>
        <Separator
          vertical
          className="w-[1px] h-10 bg-neutral-200"
        />
        <div>
          <label className="text-base font-medium text-base-black block">
            Passengers
          </label>
          <input
            placeholder="1 Adult"
            className="font-normal text-sm leading-5 text-neutral-500"
          />
        </div>
        <div>
          <Button
            size={'lg'}
            variant={'primary'}
            className="min-w-[14em]"
          >
            Find a Ride
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero