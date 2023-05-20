import { useMemo, useState } from 'react'

import TicketSearch from '@/components/ticket-search'
import Station from '@/types/station'

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import * as process from 'process'


const Hero = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  })
  const [selection, setSelection] = useState<{ from?: Station, to?: Station }>()
  const mapSettings = useMemo(() => {
    const from = selection?.from?.locationLngLat
    const to = selection?.to?.locationLngLat
    if (!from && !to) 
      return ({ lat: 30.0444, lng: 31.2357, zoom: 13 })
    
    if (from && !to) {
      return {
        ...from,
        zoom: 13,
      }
    }
    
    if (!from && to) {
      return {
        ...to,
        zoom: 13,
      }
    }
    
    if (!from || !to) return ({ lat: 30.0444, lng: 31.2357, zoom: 13 })
    
    const lat = (from.lat + to.lat) / 2
    const lng = (from.lng + to.lng) / 2

    const zoom = Math.min(
      Math.log2(360 * 1.5 / Math.abs(from.lng - to.lng)),
      Math.log2(180 * 1.5 / Math.abs(from.lat - to.lat)),
    )

    return {
      lat,
      lng,
      zoom,
    }
  }, [selection?.from?.locationLngLat, selection?.to?.locationLngLat])

  return (
    <div className="w-screen -mx-4 md:mx-[calc((100vw-100%)/-2+8px)]">
      <div className="relative">
        {isLoaded ? (
          <GoogleMap
            zoom={mapSettings.zoom}
            center={({ lat: mapSettings.lat, lng: mapSettings.lng })}
            mapContainerClassName="map-container"
            mapContainerStyle={{ position: 'relative', width: '100vw', height: '80vh' }}
            options={{ mapId: process.env.NEXT_PUBLIC_MAP_ID }}
          >
            {selection?.from && (
              <Marker
                position={selection.from.locationLngLat}
                label={selection.from.name}
              />
            )}
            {selection?.to && (
              <Marker
                position={selection.to.locationLngLat}
                label={selection.to.name}
              />
            )}
          </GoogleMap>
        ) : (
          <div className="w-full h-[80vh] bg-neutral-200 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
      </div>
      <TicketSearch
        dynamicLocationUpdate={({ from, to }: { from?: Station, to?: Station }) => {
          if (from)
            setSelection(prev => ({ ...prev, from }))
          if (to)
            setSelection(prev => ({ ...prev, to }))
        }}
      />
    </div>
  )
}

export default Hero