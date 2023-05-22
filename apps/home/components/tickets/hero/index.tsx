import { useEffect } from 'react'

import { Gradient } from '@/components/gradient'

const Hero = () => {

  useEffect(() => {
    const gradient = new Gradient()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    gradient.initGradient('#gradient-canvas')
  }, [])
  
  return (
    <div
      className="bg-green-400 relative w-screen h-[40vh] -mx-4 md:mx-[calc((100vw-100%)/-2+8px)]"
    >
      <canvas
        data-transition-in=""
        id="gradient-canvas"
      />
    </div>
  )
}

export default Hero