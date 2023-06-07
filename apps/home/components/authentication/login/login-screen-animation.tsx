import Radial from '@/components/radial-animation'

import PerspectiveGrid from './perspective-grid'

const LoginScreenAnimation = () => {

  return (
    <div className="h-screen flex flex-col grow gap-10 items-center justify-center ltr:border-l rtl:border-r relative overflow-hidden">
      <PerspectiveGrid />

      <div className="absolute bottom-[10%] z-0">
        <Radial character="M" />
      </div>
    </div>
  )
}

export default LoginScreenAnimation