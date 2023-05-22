import Station from '@/types/station'

interface Line {
  id: string
  name: string
  name_ar: string
  color: string
  stations: Station[]
}

export default Line