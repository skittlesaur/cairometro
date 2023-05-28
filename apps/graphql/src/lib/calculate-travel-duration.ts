interface Location {
  lat: number
  lng: number
}

const metroSpeed: [number, number] = [30, 40]
const calculateTravelDuration = (station1Location: Location, station2Location: Location, metroSpeedRange: [number, number] = metroSpeed) => {
  const speed = Math.floor(Math.random() * (metroSpeedRange[1] - metroSpeedRange[0] + 1) + metroSpeedRange[0])

  // calculate distance between two stations in km
  const distance = Math.sqrt(Math.pow(station1Location.lat - station2Location.lat, 2) + Math.pow(station1Location.lng - station2Location.lng, 2)) * 111.2
  const duration = distance / speed

  // duration in minutes
  return duration * 60
}

export default calculateTravelDuration