import { GraphQLError } from 'graphql/error'

import { FieldResolver } from 'nexus/src/typegenTypeHelpers'

import { Context } from '../../context'
import calculateRoute from '../../lib/calculate-route'
import calculateTravelDuration from '../../lib/calculate-travel-duration'
import convertLocationToLatLng from '../../lib/convert-location-to-lat-lng'
import findRoute from '../../lib/find-route'

const rideRouteByDate: FieldResolver<'Query', 'rideRouteByDate'> =
  async (_, args, ctx: Context) => {
    const { from, to, date } = args

    const departureTime = new Date(date)

    const path = await findRoute(from, to, ctx)

    if (!path) throw new GraphQLError('No route found')

    const locations = path.stationsInPath.map((station) => convertLocationToLatLng(station.location))

    const rideDuration = Math.ceil(
      locations.reduce((acc, location, index) => {
        if (index === 0) return acc
        const previousLocation = locations[index - 1]
        const duration = calculateTravelDuration(previousLocation, location)
        return acc + duration
      }, 0),
    )

    return calculateRoute(path.stationsInPath, rideDuration, departureTime)
  }

export default rideRouteByDate
