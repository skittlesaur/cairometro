import Radial from '@/components/radial-animation'

const LoginScreenAnimation = () => {
  return (
    <div className="h-screen flex flex-col grow gap-10 items-center justify-center border-l relative">
      <div className="absolute bottom-[10%]">
        <Radial></Radial>
      </div>
    </div>
  )
}

export default LoginScreenAnimation
