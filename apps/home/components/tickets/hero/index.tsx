import { useEffect } from 'react'

import TicketSearch from '@/components/ticket-search'

import { Gradient } from './gradient'

const Hero = () => {

  useEffect(() => {
    const gradient = new Gradient()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    gradient.initGradient('#gradient-canvas')
  }, [])
  
  return (
    <div
      className="relative w-screen h-[40vh] -mx-4 md:mx-[calc((100vw-100%)/-2+8px)]"
    >
      <canvas
        data-transition-in=""
        id="gradient-canvas"
      />
      <TicketSearch variant="outline" />
    </div>
  )
}

export default Hero