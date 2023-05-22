import dynamic from 'next/dynamic'

import useAnalyticsTotalUsers from '@/graphql/admin/analytics/total-users'
import CaretDownIcon from '@/icons/caret-down.svg'
import CaretUpIcon from '@/icons/caret-up.svg'

import { motion } from 'framer-motion'

const CountUp = dynamic(() => import('react-countup'), { ssr: false })

const TotalUsers = () => {
  const { data } = useAnalyticsTotalUsers()

  return (
    <div className="min-h-[20em] border border-gray-200 rounded-lg flex flex-col">
      <div className="p-5 border-b border-gray-200">
        <h1 className="font-medium">
          Total Users
        </h1>
      </div>
      <div className="flex flex-col justify-between gap-2 md:gap-3 w-full h-full p-5">
        {data ? (
          <div className="grow flex items-center justify-center gap-8">
            <div className="relative w-40 h-40 bg-white shadow-lg rounded-full p-5">
              <div className="z-[3] rounded-full bg-white shadow-lg absolute inset-9 flex flex-col justify-center items-center">
                <p className="text-xl font-medium">
                  <CountUp
                    end={data.totalUsers}
                    duration={1.5}
                    separator=","
                  />
                </p>
                <p className="text-xs">
                  Total
                </p>
              </div>
              <div className="z-[3] absolute inset-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-full h-full drop-shadow-lg"
                >
                  <motion.circle
                    initial={{ strokeDasharray: 0 }}
                    animate={{
                      strokeDasharray:
                          2 * Math.PI * 10 * (data.totalSeniors) / data.totalAdults + ' ' + 2 * Math.PI * 10 * (data.totalAdults - data.totalSeniors) / data.totalAdults,
                    }}
                    transition={{ duration: 2 }}
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="url(#a)"
                    strokeWidth="3"
                    strokeDashoffset={12}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="a"
                      x1="0%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#D1D5DB"
                      />
                      <stop
                        offset="100%"
                        stopColor="#1F2937"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="absolute inset-3 bg-primary-gradient rounded-full" />
              <div className="z-[2] absolute inset-5 bg-white rounded-full" />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="shadow-lg shadow-gray-100 flex items-center justify-center w-10 h-10 bg-white rounded-full p-3">
                  {data.weeklyUsersDiff > 0 && (
                    <CaretUpIcon className="fill-green-500" />
                  )}
                  {data.weeklyUsersDiff < 0 && (
                    <CaretDownIcon className="fill-red-500" />
                  )}
                  {data.weeklyUsersDiff === 0 && (
                    <div className="w-full h-1 rounded bg-gray-500" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-medium">
                    <CountUp
                      end={data.weeklyUsers}
                      duration={1.5}
                      separator=","
                    />
                  </p>
                  <p className="text-gray-400 text-sm">
                    Weekly new users ({data.weeklyUsersDiff * 100}%)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="shadow-lg shadow-gray-100 flex items-center justify-center w-10 h-10 bg-white rounded-full p-3">
                  {data.monthlyUsersDiff > 0 && (
                    <CaretUpIcon className="fill-green-500" />
                  )}
                  {data.monthlyUsersDiff < 0 && (
                    <CaretDownIcon className="fill-red-500" />
                  )}
                  {data.monthlyUsersDiff === 0 && (
                    <div className="w-full h-1 rounded bg-gray-500" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-medium">
                    <CountUp
                      end={data.monthlyUsers}
                      duration={1.5}
                      separator=","
                    />
                  </p>
                  <p className="text-gray-400 text-sm">
                    Monthly new users ({data.monthlyUsersDiff * 100}%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 animate-pulse rounded" />
        )}
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary-gradient rounded-full" />
            <p className="text-xs font-medium">
              Adults
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gradient-to-tl from-gray-800 to-gray-300 rounded-full" />
            <p className="text-xs font-medium">
              Seniors
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalUsers