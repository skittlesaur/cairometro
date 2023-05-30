import Line from '@/types/line'

interface Station {
  id: string
  name: string
  name_ar: string
  location: string
  locationLngLat: {
    lng: number
    lat: number
  }
  stationPositionInLine: {
    position: number
    line: Line
  }[]
  lines: Line[]
  lineIds: string[]
}

export default Station