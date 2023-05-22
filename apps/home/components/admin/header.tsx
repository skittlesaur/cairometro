import dynamic from 'next/dynamic'

import Card from '@/components/admin/card'
import HeroGradient from '@/components/admin/hero-gradient'

import { AnimatePresence, motion } from 'framer-motion'

const CountUp = dynamic(() => import('react-countup'), { ssr: false })

interface HeaderProps {
  data: {
    title: string
    value: number | string
    icon: ()=> JSX.Element
  }[]
  allLoaded: boolean
}

const Header = ({ data, allLoaded }: HeaderProps) => {
  return (
    <HeroGradient>
      {data?.map((item, index) => (
        <Card key={index}>
          <div className="flex flex-col w-full grow justify-between gap-2">
            <div className="bg-white rounded-lg w-14 h-14 p-2 border border-gray-200">
              <item.icon />
            </div>
            <h1 className="text-neutral-600 text-sm">
              {item.title}
            </h1>
            <h2 className="text-2xl font-semibold">
              <AnimatePresence mode="wait">
                {allLoaded ? (
                  <motion.span
                    key="value"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {typeof item.value === 'number' ? (
                      <CountUp
                        end={item.value}
                        duration={1.5}
                        separator=","
                      />
                    ) : (
                      item.value
                    )}
                  </motion.span>
                ) : (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="animate-pulse w-32 h-8 bg-gray-200 rounded-lg"
                  />
                )}
              </AnimatePresence>
            </h2>
          </div>
        </Card>
      ))}
    </HeroGradient>
  )
}

export default Header