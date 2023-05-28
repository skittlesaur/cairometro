import { objectType } from 'nexus'
import { Station } from 'nexus-prisma'

import convertLocationToLatLng from '../lib/convert-location-to-lat-lng'

const StationType = objectType({
  name: Station.$name,
  definition(t) {
    t.field(Station.id)
    t.field(Station.name)
    t.field(Station.name_ar)
    t.field(Station.location)
    t.field(Station.lines)
    t.field(Station.departureSchedules)
    t.field(Station.arrivalSchedules)
    t.field(Station.stationPositionInLine)
    t.field({
      name: 'locationLngLat',
      type: 'LngLat',
      resolve: (station) => {
        const coordinates = station.location
        return convertLocationToLatLng(coordinates)
      },
    })
  },
})


export default StationType