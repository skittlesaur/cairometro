import Station from '@/types/station'

interface Recommendation {
  from: Station
  to: Station
  schedule: {
    departureTime: string
    arrivalTime: string
  }[]
  price: number,
  noOfStationsOnPath: number
}

export default Recommendation