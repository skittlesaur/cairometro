import Radial from '@/components/radial-animation'

const LoginScreenAnimation = () => {
  return (
    <div className="h-screen flex flex-col grow gap-10 items-center justify-center ltr:border-l rtl:border-r relative">
      <div className="absolute bottom-[10%]">
        <Radial character="M" />
      </div>
    </div>
  )
}

export default LoginScreenAnimation
