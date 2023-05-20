import { useMemo } from 'react'

import TicketSearch from '@/components/ticket-search'
import useStations from '@/graphql/stations/stations'

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import * as process from 'process'


const Hero = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  })

  const center = useMemo(() => ({ lat: 30.0444, lng: 31.2357 }), [])

  const { data: stations } = useStations()

  return (
    <div className="w-screen -mx-4 md:mx-[calc((100vw-100%)/-2+8px)]">
      <div className="relative">
        {isLoaded ? (
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
            mapContainerStyle={{ position: 'relative', width: '100vw', height: '80vh' }}
            options={{ mapId: process.env.NEXT_PUBLIC_MAP_ID }}
          >
            {stations?.map((station: { id: string, locationLngLat: { lat: number, lng: number } }) => (
              <Marker
                key={station.id}
                position={{ lat: station.locationLngLat.lat, lng: station.locationLngLat.lng }}
              />
            ))}
          </GoogleMap>
        ) : (
          <div className="w-full h-[80vh] bg-neutral-200 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
      </div>
      <TicketSearch />
    </div>
  )
}

export default Hero