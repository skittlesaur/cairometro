const convertLatLngToLocation = (latLng: { lat: number; lng: number }) => {
  const latDirection = latLng.lat >= 0 ? 'N' : 'S'
  const lonDirection = latLng.lng >= 0 ? 'E' : 'W'

  const latDegrees = Math.abs(latLng.lat)
  const lonDegrees = Math.abs(latLng.lng)

  const latHours = Math.floor(latDegrees)
  const lonHours = Math.floor(lonDegrees)

  const latMinutesFloat = (latDegrees - latHours) * 60
  const lonMinutesFloat = (lonDegrees - lonHours) * 60

  const latMinutes = Math.floor(latMinutesFloat)
  const lonMinutes = Math.floor(lonMinutesFloat)

  const latSeconds = Math.round((latMinutesFloat - latMinutes) * 60)
  const lonSeconds = Math.round((lonMinutesFloat - lonMinutes) * 60)

  return `${latHours}°${latMinutes}′${latSeconds}″${latDirection} ${lonHours}°${lonMinutes}′${lonSeconds}″${lonDirection}`
}

export default convertLatLngToLocation