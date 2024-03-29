import Pricing from '@/types/pricing'
import Station from '@/types/station'

interface Line {
  id: string
  name: string
  name_ar: string
  color: string
  stations: Station[]
  sortedStations: Station[]
  pricing: Pricing
}

export default Line