import Companion from '@/components/home/companion'
import Faq from '@/components/home/faq'
import Hero from '@/components/home/hero'

const Home = () => {
  return (
    <div className="flex flex-col gap-16 md:gap-40 mb-16 md:mb-40">
      <Hero />
      <Companion />
      <Faq />
      <div className="h-[70vh] bg-neutral-50 flex items-center justify-center">
        <Discover />
      </div>
    </div>
  )
}

export default Home
