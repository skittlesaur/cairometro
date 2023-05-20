interface Station {
  id: string
  name: string
  name_ar: string
  location: string
  locationLngLat: {
    lng: number
    lat: number
  }
}

export default Station