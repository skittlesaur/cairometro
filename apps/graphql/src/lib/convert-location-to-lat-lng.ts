const extractCoordinates = (coordinate: string) => {
  const regex = /(\d+)°(\d+)′(\d+)″/
  const match = regex.exec(coordinate)

  if (match) {
    const deg = parseInt(match[1])
    const min = parseInt(match[2])
    const sec = parseInt(match[3])

    return { deg, min, sec }
  }

  return { deg: 0, min: 0, sec: 0 }
}

const convertLocationToLatLng = (location: string) => {
  const [lat, lng] = location.split(' ')

  const { deg: latDeg, min: latMin, sec: latSec } = extractCoordinates(lat)
  const { deg: lngDeg, min: lngMin, sec: lngSec } = extractCoordinates(lng)

  const latNum = latDeg + latMin / 60 + latSec / 3600
  const lngNum = lngDeg + lngMin / 60 + lngSec / 3600

  return {
    lat: latNum,
    lng: lngNum,
  }
}

export default convertLocationToLatLng