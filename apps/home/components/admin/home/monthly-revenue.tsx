import { useMemo, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

const MonthlyRevenue = () => {
  const [currentHover, setCurrentHover] = useState<string>()
  const { i18n } = useTranslation()

  const data = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: `${i}`,
      month: new Date(2023, i).toLocaleString(i18n.language, { month: 'short' }),
      value: Math.floor(Math.random() * 1000),
    }))
  }, [i18n.language])

  const maxValue = Math.max(...data.map(({ value }) => value))

  return (
    <div className="min-h-[20em] border border-gray-200 rounded-lg flex flex-col">
      <div className="p-5 border-b border-gray-200">
        <h1 className="font-medium">
          Monthly Revenue
        </h1>
      </div>
      <div className="flex justify-between gap-3 md:gap-5 w-full h-full p-5">
        {data.map(({ month, value, id }, index) => (
          <motion.div
            key={month}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{
              type: 'spring',
              mass: 1,
              damping: 6,
              stiffness: 20,
              delay: index * 0.1,
            }}
            className="flex flex-col gap-2 justify-end items-center w-full"
            onMouseEnter={() => setCurrentHover(id)}
            onMouseLeave={() => setCurrentHover(undefined)}
          >
            <div
              className="relative bg-gray-200 w-full rounded"
              style={{
                height: `clamp(1em, ${value / maxValue * 100}%, calc(100%-2em))`,
              }}
            >
              <AnimatePresence mode="wait">
                {currentHover === id && (
                  <div className="absolute inset-0 rounded overflow-hidden pointer-events-none">
                    <motion.div
                      key={id}
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      exit={{ height: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: 'easeOut',
                      }}
                      className="absolute bottom-0 w-full h-full bg-primary-gradient"
                    />
                  </div>
                )}
                {currentHover === id && (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full mb-2 flex items-center gap-2 z-10 left-2.5"
                  >
                    <div className="border-2 border-primary rounded-full w-2 h-2" />
                    <div className="relative">
                      <div className="rounded-[1px] absolute top-1/2 -translate-y-1/2 bg-gray-900 z-[-1] w-2 h-2 rotate-45 translate-x-[calc(-50%+2px)]" />
                      <p className="text-xs font-medium text-white px-2 py-1.5 rounded-lg bg-gray-900 whitespace-nowrap">
                        {value} EGP
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="text-xs font-medium text-gray-500">
              {month}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MonthlyRevenue