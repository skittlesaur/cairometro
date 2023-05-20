import { useMemo } from 'react'

import useStations from '@/graphql/stations/stations'
import mapOptions from '@/lib/map-options'
import Line from '@/types/line'
import Station from '@/types/station'

import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api'
import { useTranslation } from 'next-i18next'
import process from 'process'

interface LineData extends Line {
  path: Array<{
    lat: number
    lng: number
    position: number
  }>
}

interface MapProps {
  children?: React.ReactNode
  mapSettings?: {
    lat: number
    lng: number
    zoom: number
  }
}

const Map = ({ children, mapSettings }: MapProps) => {
  const { i18n } = useTranslation()
  const { data: stations } = useStations()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  })

  const mapCenter = useMemo(() => {
    if (mapSettings) return {
      lat: mapSettings.lat,
      lng: mapSettings.lng,
    }
    return {
      lat: 30.02,
      lng: 31.25,
    }
  }, [mapSettings])

  const linesData = useMemo(() => {
    const lines: LineData[] = []

    stations?.forEach((station: Station) => {
      station.lines.forEach((line: Line) => {
        const position = station.stationPositionInLine?.find((s: { line: Line }) => s.line.id === line.id)?.position ?? 0
        if (!lines.find((l: Line) => l.id === line.id)) {
          lines.push({
            ...line,
            path: [{
              ...station.locationLngLat,
              position,
            }],
          })
        } else {
          const index = lines.findIndex((l: Line) => l.id === line.id)
          lines[index].path.push({
            ...station.locationLngLat,
            position,
          })
        }
      })
    })

    // sort stations by position
    lines.forEach((line: LineData) => {
      line.path.sort((a, b) => a.position - b.position)
    })

    return lines
  }, [stations])
  
  return (
    isLoaded ? (
      <GoogleMap
        zoom={mapSettings?.zoom ?? 12}
        center={mapCenter}
        mapContainerClassName="map-container"
        mapContainerStyle={{ position: 'relative', width: '100%', height: '100%' }}
        options={mapOptions}
      >
        {children}
        {stations?.map((station: Station) => (
          <Marker
            key={station.id}
            position={{
              lat: station.locationLngLat.lat,
              lng: station.locationLngLat.lng,
            }}
            icon={{
              url: '/assets/metro-black.png',
              scaledSize: new window.google.maps.Size(15, 15),

            }}
            title={i18n.language === 'ar' ? station.name_ar : station.name}
          />
        ))}
        {linesData?.map((line: LineData) => (
          <Polyline
            key={line.id}
            path={line.path.map((p) => ({ lat: p.lat, lng: p.lng }))}
            options={{
              strokeColor: line.color,
              strokeOpacity: 1,
              strokeWeight: 5,
            }}
          />
        ))}
      </GoogleMap>
    ) : (
      <div className="w-full h-[80vh] bg-neutral-200 animate-pulse" />
    )
  )
}

export default Map