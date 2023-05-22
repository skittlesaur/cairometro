import { ReactNode, useEffect } from 'react'

import { Gradient } from '@/components/gradient'

const HeroGradient = ({ children }: {children?: ReactNode}) => {

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
      <div className="relative z-[5] -translate-y-1/2 -mb-28 md:-mb-10 gap-4 md:gap-8 flex md:flex-row grid grid-cols-2 lg:grid-cols-4 px-5 py-4 md:px-9 md:py-7 mx-4 md:mx-auto md:w-full max-w-[1300px]">
        {children}
      </div>
    </div>
  )
}

export default HeroGradient