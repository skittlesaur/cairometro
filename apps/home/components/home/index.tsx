import Companion from '@/components/home/companion'
import Discover from '@/components/home/discover'
import Faq from '@/components/home/faq'
import Hero from '@/components/home/hero'


const Home = () => {
  return (
    <div className="flex flex-col gap-16 md:gap-40 mb-16 md:mb-40">
      <Hero />
      <Companion />
      <Faq />
      <Discover />
    </div>
  )
}

export default Home
