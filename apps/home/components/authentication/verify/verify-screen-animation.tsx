import Radial from '@/components/radial-animation'

const VerifyScreenAnimation = () => {
  return (
    <div className="fixed bottom-0 right-0 flex-col gap-10 ">
      <div className="flex -bottom-4 -right-4">
        <Radial character="@" />
      </div>
    </div>
  )
}

export default VerifyScreenAnimation