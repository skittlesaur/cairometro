import Faq from './faq'

const Home = () => {
  return (
    <div className="flex flex-col gap-16 md:gap-40 mb-16 md:mb-40">
      <div className="h-[90vh] bg-neutral-50 flex items-center justify-center mx-[calc((100vw-100%)/-2+8px)]">
        hero component
      </div>
      <div className="h-[35vh] bg-neutral-50 flex items-center justify-center">
        companion component
      </div>
      <Faq />
      <div className="h-[70vh] bg-neutral-50 flex items-center justify-center">
        discover component
      </div>
    </div>
  )
}

export default Home