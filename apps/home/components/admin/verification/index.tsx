import { useState } from 'react'

import Header from '@/components/admin/header'
import { Button } from '@/components/button'
import useSeniorsAnalytics from '@/graphql/admin/analytics/seniors-analytics'
import updateVerificationRequestMutation, { UpdateVerificationRequestVariables } from '@/graphql/admin/verifications/update-verification-request'
import useVerifications, { VerificationVariables } from '@/graphql/admin/verifications/verifications'
import CalendarIcon from '@/icons/calendar-outline.svg'
import CheckboxIcon from '@/icons/checkbox-outline.svg'
import CloseCircleIcon from '@/icons/close-circle-outline.svg'
import PersonIcon from '@/icons/person-outline.svg'
import User from '@/types/user'

import { AnimatePresence } from 'framer-motion'

import VerificationRequestCard from './verification-request-card'
import VerificationsTable from './verification-table'

const Verifications = () => {
  const [userOpen, setUserOpen] = useState<User | undefined>(undefined)
  const [page, setPage] = useState(0)
  const [take, setTake] = useState(6)
  const [filterBy, setFilterBy] = useState<VerificationVariables['filterBy']>('ALL')
  const [search, setSearch] = useState('')
  
  const { data: verifications, mutate: mutateVerifications } = useVerifications({
    page,
    take,
    filterBy,
    search,
  })

  const { data: analytics, isLoading: analyticsLoading } = useSeniorsAnalytics()

  const data = [
    {
      title: 'Total Senior Requests',
      value: analytics?.total,
      icon: PersonIcon,
    },
    {
      title: 'Total Approved',
      value: analytics?.totalApproved,
      icon: CheckboxIcon,
    },
    {
      title: 'Total Rejected',
      value: analytics?.totalRejected,
      icon: CloseCircleIcon,
    },
    {
      title: 'Total Seniors This Month',
      value: analytics?.totalThisMonth,
      icon: CalendarIcon,
    },
  ]

  const optimisticUpdate = async (variables: UpdateVerificationRequestVariables) => {
    await mutateVerifications(async () => {
      await updateVerificationRequestMutation(variables)
      return verifications.map((user: User) => {
        if (user.id === variables.userId) {
          return {
            ...user,
            documentVerified: variables.documentVerified.verificationstatus,
          }
        }

        return user
      })
    }, {
      optimisticData: verifications.map((user: User) => {
        if (user.id === variables.userId) {
          return {
            ...user,
            documentVerified: variables.documentVerified.verificationstatus,
          }
        }

        return user
      }),
      rollbackOnError: true,
      populateCache: true,
      revalidate: true,
    })
  }

  return (
    <div className="w-full">
      <Header
        data={data}
        allLoaded={!analyticsLoading && analytics}
      />
      <AnimatePresence mode="wait">
        {userOpen && (
          <VerificationRequestCard
            key={userOpen.id}
            userId={userOpen.id}
            userName={userOpen.name}
            email={userOpen.email}
            date={new Date(userOpen.createdAt)}
            role={userOpen.role}
            documentVerified={userOpen.documentVerified}
            documentUrl={userOpen.documentUrl}
            setUserOpen={setUserOpen}
            optimisticUpdate={optimisticUpdate}
          />
        )}
      </AnimatePresence>
      <VerificationsTable
        search={search}
        setSearch={setSearch}
        setUserOpen={setUserOpen}
        setFilterBy={setFilterBy}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={verifications?.map((datum: any) => ({
          ...datum,
          user: {
            name: datum.name,
            email: datum.email,
          },
        }))}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-gray-500 text-sm">
            Show result
          </label>
          <select 
            className="border px-2 py-1.5 rounded-lg text-sm font-medium"
            value={take}
            onChange={(e) => {
              console.log(parseInt(e.target.value))
              setTake(parseInt(e.target.value))
            }}
          >
            {[6, 10, 14].map((val) => (
              <option
                key={val}
                value={val}
              >
                {val}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage(prev => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!verifications || verifications?.length < take}
            onClick={() => setPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Verifications